"use client";

import { useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";

export const GlobalPostContext = createContext();

const GlobalPostProvider = ({ children }) => {
  const { data: session } = useSession();
  // Get posts
  const [myPosts, setMyPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  // Fetch all posts
  const fetchAllPosts = async () => {
    try {
      const response = await fetch("/api/post");
      if (response.ok && response.status === 200) {
        const data = await response.json();
        Array.isArray(data) ? setAllPosts(data) : setAllPosts([]);
      }
    } catch (error) {
      console.log("Error from page.jsx - fetching all posts", error);
    }
  };

  // Fetch my posts
  const fetchMyPosts = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        Array.isArray(data) ? setMyPosts(data) : setMyPosts([]);
      }
    } catch (error) {
      console.log("Error from fetching my posts", error);
    }
  };

  // First render, display all posts
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // When user logged in, display user's posts
  useEffect(() => {
    if (session && session.user.id) fetchMyPosts();
  }, [session && session.user.id]);

  useEffect(() => {
    const filteredPosts = allPosts.filter(
      (eachPost) => session?.user.id !== eachPost.userId._id
    );
    setOtherPosts(filteredPosts);
  }, [allPosts, myPosts]);

  return (
    <GlobalPostContext.Provider
      value={{
        myPosts,
        setMyPosts,
        otherPosts,
        allPosts,
      }}
    >
      {children}
    </GlobalPostContext.Provider>
  );
};

export default GlobalPostProvider;
