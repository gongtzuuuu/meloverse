"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  const fetchPosts = async () => {
    const reponse = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await reponse.json();

    setMyPosts(data);
  };

  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <Profile
      name="My"
      desc="Welcome to my personalised profile page"
      data={myPosts} // It would be a list of posts
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
