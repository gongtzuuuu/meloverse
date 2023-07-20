"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [mySavedTracks, setMySavedTracks] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  // Fetch saved tracks from the user
  const fetchMySavedTracks = async () => {
    if (session && session.accessToken) {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/tracks", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        console.log("fetching saved tracks", data);
        setMySavedTracks(data.items);
      } catch (error) {
        console.log("Error from fetching user's playlist");
      }
    }
  };

  // Fetch posts from the user
  const fetchMyPosts = async () => {
    const reponse = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await reponse.json();

    setMyPosts(data);
  };

  useEffect(() => {
    fetchMySavedTracks();
  }, [session]);

  // Fetch User's posts
  useEffect(() => {
    if (session?.user.id) fetchMyPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
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
            myPosts={myPosts} // It would be a list of posts
            mySavedTracks={mySavedTracks} // It would be a list of saved songs
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <button
            type="button"
            onClick={signOut}
            className="mt-5 black_btn mb-6"
          >
            Sign Out
          </button>
        </>
      ) : (
        <h1>Please login</h1>
      )}

      <div className="h-32"></div>
    </>
  );
};

export default MyProfile;
