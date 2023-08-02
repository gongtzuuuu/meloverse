"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import NotLogin from "@components/NotLogin";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);

  // Fetch posts from the user
  const fetchMyPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    if (response) {
      const data = await response.json();
      Array.isArray(data) ? setMyPosts(data) : setMyPosts([]);
    }
  };

  // Fetch User's posts
  useEffect(() => {
    if (session?.user.id) fetchMyPosts();
  }, [session?.user.id]);

  const handleEdit = (postId) => {
    console.log("Post to edit", postId);
    router.push(`/post/${postId}`);
  };

  const handleDelete = async (post) => {
    // This confirm prompt is built into the browser API
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post._id.toString()}`, {
          method: "DELETE",
        });

        // Filter the post that has been deleted, and update myPosts
        const filteredPosts = myPosts.filter((p) => p._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {session && session?.user ? (
        <>
          <Profile
            name="My"
            desc="Welcome to my personalised profile page"
            postData={myPosts}
            text={"Your posts"}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <button
            type="button"
            onClick={signOut}
            className="mt-5 black_btn mb-6"
          >
            Logout
          </button>
        </>
      ) : (
        <NotLogin
          text={"Something wrong, please login again or refresh the page."}
        />
      )}
      <div className="h-32"></div>
    </>
  );
};

export default MyProfile;
