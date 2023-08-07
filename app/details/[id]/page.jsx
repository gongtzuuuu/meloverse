"use client";

import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GlobalPostContext } from "@components/GlobalPostProvider";
import SongDetail from "@components/SongDetail";
import PostFeed from "@components/PostFeed";
import Form from "@components/Form";

const Details = ({ params }) => {
  // Get user's info
  const router = useRouter();
  const { data: session } = useSession();
  const { globalAllPosts, setGlobalAllPosts, globalMyPosts, setGlobalMyPosts } =
    useContext(GlobalPostContext);
  // Get song's info
  const [songInfo, setSongInfo] = useState(null);
  const [songAllPosts, setSongAllPosts] = useState([]);
  const [songMyPosts, setSongMyPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  // Get form's info
  const [toggleShow, setToggleShow] = useState(false);
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
        if (response.ok && response.status === 200) {
          const data = await response.json();
          setSongInfo(data);
        }
      } catch (error) {
        console.log("Error from fetching song detail", error);
      }
    }
  };

  // Fetch song's posts
  const fetchSongPosts = async () => {
    try {
      const response = await fetch(`/api/songs/${params.id}/posts`);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        Array.isArray(data) ? setSongAllPosts(data) : setSongAllPosts([]);
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
      const newPost = {
        userId: session?.user.id, // We have to check if there's an user
        songId: params.id,
        songDetail: {
          name: songInfo.name,
          artist: songInfo.artists[0].name,
          album_img: songInfo.album.images[0].url,
        },
        post: post.post,
        tag: post.tag,
      };

      // 1. Call API
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify(newPost),
      });
      // 2. If the post if succedssfully created, then bring back to home
      if (response.ok && response.status === 201) {
        router.push(`/profile/${session?.user.id}`);
        setGlobalMyPosts([newPost, ...globalMyPosts]);
        setGlobalAllPosts([newPost, ...globalAllPosts]);
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
    if (songAllPosts) {
      // Filter my songs
      const filteredMyPosts = songAllPosts.filter(
        (post) => post.userId._id === session?.user.id
      );
      setSongMyPosts(filteredMyPosts);
      // Filter other songs
      const filteredOtherPosts = songAllPosts.filter(
        (post) => post.userId._id !== session?.user.id
      );
      setOtherPosts(filteredOtherPosts);
    }
  }, [songAllPosts]);

  return (
    <section className="w-full">
      {songInfo && (
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
      )}
      <PostFeed postData={songMyPosts} text={"Your Posts"} />
      <PostFeed postData={otherPosts} text={"Stories from Others"} />
      <div className="h-32"></div>
    </section>
  );
};

export default Details;
