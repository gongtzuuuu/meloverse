"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PostFeed from "@components/PostFeed";

const Home = () => {
  const { data: session } = useSession();
  const [currentGreetings, setCurrentGreetings] = useState("");

  // Get posts
  const [myPosts, setMyPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  // Change greetings on homepage
  const greetings = () => {
    const currentTime = new Date().getHours();
    if (currentTime > 3 && currentTime <= 12) {
      setCurrentGreetings("Good Morning");
    } else if (currentTime > 12 && currentTime <= 17) {
      setCurrentGreetings("Good Afternoon");
    } else if (currentTime > 17 && currentTime <= 20) {
      setCurrentGreetings("Good Evening");
    } else {
      setCurrentGreetings("How is your day?");
    }
  };

  // Fetch all posts
  const fetchAllPosts = async () => {
    try {
      const reponse = await fetch("/api/post");
      const data = await reponse.json();
      // console.log("Data from fetching all posts on homepage", data);
      setAllPosts(data);
    } catch (error) {
      console.log("Error from page.jsx - fetching all posts", error);
    }
  };

  // Fetch my posts
  const fetchMyPosts = async () => {
    const reponse = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await reponse.json();
    setMyPosts(data);
  };

  // First render, display all posts
  useEffect(() => {
    greetings();
    fetchAllPosts();
  }, []);

  // When user logged in, display user's posts
  useEffect(() => {
    if (session?.user.id) fetchMyPosts();
  }, [session?.user.id]);

  return (
    <section className="w-full flex-center flex-col">
      {/* Check if user is loggin in */}
      {session?.user ? (
        <div>
          <h1 className="head_text">
            {currentGreetings} <br className="max-md:hidden" />
            <span className="orange_gradient">{session.user.name}</span>
          </h1>
          <p className="desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <PostFeed postData={myPosts} text={"Your post..."} />
        </div>
      ) : (
        <div>
          <h1 className="head_text">
            Let's explore <br className="max-md:hidden" />
            <span className="orange_gradient">your meloverse</span>
          </h1>
          <p className="desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
      )}
      <PostFeed postData={allPosts} text={"Explore more..."} />
      <div className="h-32"></div>
    </section>
  );
};

export default Home;
