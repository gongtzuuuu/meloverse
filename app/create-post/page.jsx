"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    post: "",
    tag: "",
  });

  const createPost = async (e) => {
    e.preventDefault(); //Prevent browser default behaviour: reload the page
    setIsSubmitting(true);

    //Create a post
    try {
      //1. Call an API
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          post: post.post,
          userId: session?.user.id, //We have to check if there's an user
          tag: post.tag,
        }),
      });

      //2. If the post if succedssfully created, then bring back to home
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
      type="Create"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
