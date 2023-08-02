"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PostFeed from "@components/PostFeed";

const Home = () => {
  const { data: session } = useSession();
  const [currentGreetings, setCurrentGreetings] = useState("");

  // Get posts
  const [myPosts, setMyPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
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
      const response = await fetch("/api/post");
      if (response) {
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
      if (response) {
        const data = await response.json();
        Array.isArray(data) ? setMyPosts(data) : setMyPosts([]);
      }
    } catch (error) {
      console.log("Error from fetching my posts", error);
    }
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

  useEffect(() => {
    const filteredPosts = allPosts.filter(
      (eachPost) => session?.user.id !== eachPost.userId._id
    );
    setOtherPosts(filteredPosts);
  }, [allPosts, myPosts]);

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
            Welcome to Meloverse, the ultimate app for music enthusiasts.
          </p>
        </div>
      ) : (
        <div>
          <h1 className="head_text">
            Let's explore <br className="max-md:hidden" />
            <span className="orange_gradient">your meloverse</span>
          </h1>
          <p className="desc">
            Express with Music! Compose captivating posts with your favorite
            Spotify songs. Join now and share your melodic journey!
          </p>
        </div>
      )}
      {session?.user && myPosts.length > 0 ? (
        <PostFeed postData={myPosts} text={"Your post..."} />
      ) : (
        <></>
      )}
      {otherPosts.length > 0 ? (
        <PostFeed postData={otherPosts} text={"Explore more..."} />
      ) : (
        <></>
      )}
      <div className="h-32"></div>
    </section>
  );
};

export default Home;
