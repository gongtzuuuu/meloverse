"use client";

import { useState, useEffect, useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GlobalPostContext } from "@components/GlobalPostProvider";
import Profile from "@components/Profile";
import SongFeed from "@components/SongFeed";

const UserProfile = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { globalAllPosts, setGlobalAllPosts, setGlobalMyPosts } =
    useContext(GlobalPostContext);

  // Fetch user's infomation
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}`);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        data ? setUserInfo(data) : setUserInfo(null);
      }
    } catch (error) {
      onsole.log("Error from fetching user's info", error);
    }
  };

  // Fetch posts from the user
  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}/posts`);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        Array.isArray(data) ? setUserPosts(data) : setUserPosts([]);
      }
    } catch (error) {
      console.log("Error from fetching user's posts", error);
    }
  };

  // Handle delete method used on profile page
  const handleDelete = async (post) => {
    // This confirm prompt is built into the browser API
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post._id.toString()}`, {
          method: "DELETE",
        });
        // Filter the post that has been deleted, and update myPosts
        const filteredPosts = userPosts.filter((p) => p._id !== post._id);
        const filteredAllPosts = globalAllPosts.filter(
          (p) => p._id !== post._id
        );
        setUserPosts(filteredPosts);
        setGlobalMyPosts(filteredPosts);
        setGlobalAllPosts(filteredAllPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Fetch User's posts
  useEffect(() => {
    fetchUserInfo();
    fetchUserPosts();
  }, []);

  return (
    <>
      <Profile
        userInfo={userInfo}
        postData={userPosts} // It would be a list of posts
        handleDelete={handleDelete}
      />
      {session && session?.user.id === params.id && (
        <>
          <SongFeed text="Liked Songs" />
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-5 black_btn mb-6"
          >
            Logout
          </button>
        </>
      )}
      <div className="h-32"></div>
    </>
  );
};

export default UserProfile;
