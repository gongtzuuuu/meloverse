"use client";

import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [username, setUsername] = useState(null);

  // Fetch posts from the user
  const fetchUserPosts = async () => {
    const reponse = await fetch(`/api/users/${params.id}/posts`);
    const data = await reponse.json();
    setUserPosts(data);
    setUsername(data[0].userId.username);
  };

  // Fetch User's posts
  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <>
      <Profile
        name={username}
        desc={`Welcome to ${username} profile page`}
        postData={userPosts} // It would be a list of posts
      />
      <div className="h-32"></div>
    </>
  );
};

export default UserProfile;
