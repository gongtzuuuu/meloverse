"use client";

import { useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";

export const GlobalPostContext = createContext();

const GlobalPostProvider = ({ children }) => {
  const { data: session } = useSession();
  // Get posts
  const [globalAllPosts, setGlobalAllPosts] = useState([]);
  const [globalMyPosts, setGlobalMyPosts] = useState([]);

  // Fetch all posts
  const fetchGlobalAllPosts = async () => {
    try {
      const response = await fetch("/api/post");
      if (response.ok && response.status === 200) {
        const data = await response.json();
        Array.isArray(data) ? setGlobalAllPosts(data) : setGlobalAllPosts([]);
      }
    } catch (error) {
      console.log("Error from page.jsx - fetching all posts", error);
    }
  };

  // Fetch my posts
  const fetchGlobalMyPosts = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        Array.isArray(data) ? setGlobalMyPosts(data) : setGlobalMyPosts([]);
      }
    } catch (error) {
      console.log("Error from fetching my posts", error);
    }
  };

  // First render, display all posts
  useEffect(() => {
    fetchGlobalAllPosts();
  }, []);

  // When user logged in, display user's posts
  useEffect(() => {
    if (session && session.user.id) fetchGlobalMyPosts();
  }, [session && session.user.id]);

  return (
    <GlobalPostContext.Provider
      value={{
        globalAllPosts,
        setGlobalAllPosts,
        globalMyPosts,
        setGlobalMyPosts,
      }}
    >
      {children}
    </GlobalPostContext.Provider>
  );
};

export default GlobalPostProvider;
