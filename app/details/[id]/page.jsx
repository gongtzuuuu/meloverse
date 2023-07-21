"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SongDetail from "@components/SongDetail";
import Form from "@components/Form";

const Details = ({ params }) => {
  const router = useRouter();
  // Get user's info
  const { data: session } = useSession();
  // Get song's info
  const [songInfo, setSongInfo] = useState(null);
  // Get form's info
  const [toggleShow, setToggleShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    songId: params.id,
    post: "",
    tag: "",
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
          songId: post.songId,
          post: post.post,
          tag: post.tag,
        }),
      });
      console.log("response", response);
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
  }, [session]);

  return (
    <section className="w-full">
      <SongDetail songInfo={songInfo} setToggleShow={setToggleShow} />
      {toggleShow && (
        <Form
          post={post}
          setPost={setPost}
          isSubmitting={isSubmitting}
          setToggleShow={setToggleShow}
          handleSubmit={createPost}
        />
      )}
      <div className="h-32"></div>
    </section>
  );
};

export default Details;
