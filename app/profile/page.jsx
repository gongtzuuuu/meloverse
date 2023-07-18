"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Playlist from "@components/Playlist";

// import getUserPlaylist from "@lib/spotify";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPlaylists, setMyPlaylists] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  // Fetch User's playlists
  useEffect(() => {
    const getPlaylists = async () => {
      if (session && session.accessToken) {
        try {
          const response = await fetch(
            "https://api.spotify.com/v1/me/playlists",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
          const data = await response.json();
          setMyPlaylists(data.items);
        } catch (error) {
          console.log("Error from fetching user's playlist");
        }
      }
    };
    getPlaylists();
    console.log("data from fetching Soptify API", myPlaylists);
  }, [session]);

  // Fetch User's posts
  useEffect(() => {
    const fetchPosts = async () => {
      const reponse = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await reponse.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
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
      <Profile
        name="My"
        desc="Welcome to my personalised profile page"
        data={myPosts} // It would be a list of posts
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Playlist data={myPlaylists} />
    </>
  );
};

export default MyProfile;
