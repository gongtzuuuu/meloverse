"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SongDetail from "@components/SongDetail";
import Form from "@components/Form";
import NotLogin from "@components/NotLogin";

const PostDetails = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  // Get post's info
  const [post, setPost] = useState(null);
  const [submitStatus, setSubmitStatus] = useState("Update");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the post info
  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/post/${params.id}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.log("Error from fetching the post", error);
    }
  };

  // Handle submitting
  const updatePost = async (e) => {
    setIsSubmitting(true);
    if (session?.user.id === post.userId._id) {
      // Prevent browser default behaviour: reload the page
      e.preventDefault();
      try {
        const response = await fetch(`/api/post/${params.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            post: post.post,
            tag: post.tag,
          }),
        });
        // 2. If the post if succedssfully created, then bring back to home
        if (response.ok) {
          router.push("/profile");
        }
      } catch (error) {
        console.log("Error from Updating the post", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (session) {
      fetchPost();
    }
  }, []);

  if (post)
    return (
      <section className="feed">
        {session?.user ? (
          <>
            <SongDetail
              session={session}
              id={post.songId}
              name={post.songDetail.name}
              artist={post.songDetail.artist}
              albumImg={post.songDetail.album_img}
            />
            <Form
              post={post}
              setPost={setPost}
              submitStatus={submitStatus}
              isSubmitting={isSubmitting}
              handleSubmit={updatePost}
            />
          </>
        ) : (
          <NotLogin />
        )}
        <div className="h-32"></div>
      </section>
    );
};

export default PostDetails;
