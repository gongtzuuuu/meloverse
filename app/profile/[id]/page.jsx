"use client";

import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [username, setUsername] = useState(null);

  // Fetch posts from the user
  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}/posts`);
      if (response) {
        const data = await response.json();
        Array.isArray(data) ? setUserPosts(data) : setUserPosts([]);
        setUsername(data[0].userId.username);
      }
    } catch (error) {
      console.log("Error from fetching user's posts", error);
    }
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
        text={"User's posts"}
      />
      <div className="h-32"></div>
    </>
  );
};

export default UserProfile;
