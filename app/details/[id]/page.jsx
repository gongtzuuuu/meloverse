"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SongDetail from "@components/SongDetail";
import PostFeed from "@components/PostFeed";
import Form from "@components/Form";
import NotLogin from "@components/NotLogin";

const Details = ({ params }) => {
  const router = useRouter();
  // Get user's info
  const { data: session } = useSession();
  // Get song's info
  const [songInfo, setSongInfo] = useState(null);
  const [songPosts, setSongPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  // Get form's info
  const [toggleShow, setToggleShow] = useState(true);
  const [submitStatus, setSubmitStatus] = useState("Create");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    songId: params.id,
    post: "",
    tag: [],
  });

  // Fetch song's info
  const fetchSongInfo = async () => {
    if (session && session.accessToken) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setSongInfo(data);
      } catch (error) {
        console.log("Error from fetching song detail", error);
      }
    }
  };

  // Fetch song's posts
  const fetchSongPosts = async () => {
    try {
      const response = await fetch(`/api/songs/${params.id}/posts`);
      if (response) {
        const data = await response.json();
        Array.isArray(data) ? setSongPosts(data) : setSongPosts([]);
      }
    } catch (error) {
      console.log("Error from fetching song's posts", error);
    }
  };

  // Handle submitting
  const createPost = async (e) => {
    // Prevent browser default behaviour: reload the page
    e.preventDefault();
    setIsSubmitting(true);
    // Create a post
    try {
      // 1. Call API
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id, // We have to check if there's an user
          songId: params.id,
          songDetail: {
            name: songInfo.name,
            artist: songInfo.artists[0].name,
            album_img: songInfo.album.images[0].url,
          },
          post: post.post,
          tag: post.tag,
        }),
      });
      // 2. If the post if succedssfully created, then bring back to home
      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log("Error from Create Post Page", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchSongInfo();
    fetchSongPosts();
  }, [session]);

  useEffect(() => {
    if (songPosts) {
      // Filter my songs
      const filteredMyPosts = songPosts.filter(
        (post) => post.userId._id === session?.user.id
      );
      setMyPosts(filteredMyPosts);
      // Filter other songs
      const filteredOtherPosts = songPosts.filter(
        (post) => post.userId._id !== session?.user.id
      );
      setOtherPosts(filteredOtherPosts);
    }
  }, [songPosts]);

  return (
    <section className="w-full">
      {session?.user && songInfo ? (
        <>
          <div className="flex flex-col justify-center items-center">
            <SongDetail
              session={session}
              id={params.id}
              name={songInfo.name}
              artist={songInfo.artists[0].name}
              albumImg={songInfo.album.images[0].url}
              setToggleShow={setToggleShow}
            />
            {toggleShow && (
              <Form
                post={post}
                setPost={setPost}
                submitStatus={submitStatus}
                isSubmitting={isSubmitting}
                handleSubmit={createPost}
                setToggleShow={setToggleShow}
              />
            )}
          </div>
          <PostFeed postData={myPosts} text={"My stories"} />
          <PostFeed postData={otherPosts} text={"Other stories"} />
        </>
      ) : (
        <NotLogin />
      )}
      <div className="h-32"></div>
    </section>
  );
};

export default Details;
