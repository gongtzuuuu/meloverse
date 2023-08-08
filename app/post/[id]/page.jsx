"use client";

import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GlobalPostContext } from "@context/GlobalPostProvider";
import SongDetail from "@components/SongDetail";
import Form from "@components/Form";

const PostDetails = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { globalAllPosts, setGlobalAllPosts, globalMyPosts, setGlobalMyPosts } =
    useContext(GlobalPostContext);
  // Get post's info
  const [post, setPost] = useState(null);
  const [submitStatus, setSubmitStatus] = useState("Update");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the post info
  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/post/${params.id}`);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        setPost(data);
      }
    } catch (error) {
      console.log("Error from fetching the post", error);
    }
  };

  // Handle submitting
  const updatePost = async (e) => {
    // Prevent browser default behaviour: reload the page
    e.preventDefault();
    setIsSubmitting(true);
    const updatePost = {
      post: post.post,
      tag: post.tag,
    };

    const updatedAllPost = globalAllPosts.map((eachPost) => {
      if (eachPost.postId === params.id) {
        eachPost.post = post.post;
        eachPost.tag = post.tag;
      }
    });

    const updatedMyPost = globalMyPosts.map((eachPost) => {
      if (eachPost.postId === params.id) {
        eachPost.post = post.post;
        eachPost.tag = post.tag;
      }
    });

    if (session?.user.id === post.userId._id) {
      try {
        const response = await fetch(`/api/post/${params.id}`, {
          method: "PATCH",
          body: JSON.stringify(updatePost),
        });
        // 2. If the post if succedssfully created, then bring back to home
        if (response.ok && response.status === 200) {
          router.push(`/profile/${post.userId._id}`);
          setGlobalAllPosts(updatedAllPost);
          setGlobalMyPosts(updatedMyPost);
        }
      } catch (error) {
        console.log("Error from Updating the post", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    session && session.accessToken && fetchPost();
  }, [session]);

  if (post)
    return (
      <section className="feed">
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
        <div className="h-32"></div>
      </section>
    );
};

export default PostDetails;
