"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

// API route to edit post: /api/post/:id

const EditPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const postId = searchParams.get("id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    post: "",
    tag: "",
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      // After fetching the post details (data), then set it to the current post
      setPost({
        post: data.post,
        tag: data.tag,
      });
    };
    // Only when postId exists then execute getPostDetails()
    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postId) return alert("Post is not found");

    //Update the post
    try {
      //1. Call an API
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          post: post.post,
          tag: post.tag,
        }),
      });

      //2. If the post if succedssfully updated, then bring back to home
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error from Create Post Page", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={updatePost}
    />
  );
};

export default EditPost;
