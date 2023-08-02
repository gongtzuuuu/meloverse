"use client";

import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { GlobalPostContext } from "@components/GlobalPostProvider";
import PostFeed from "@components/PostFeed";

const Home = () => {
  const { data: session } = useSession();
  const [currentGreetings, setCurrentGreetings] = useState("");

  // Get posts
  const { myPosts, otherPosts } = useContext(GlobalPostContext);

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

  useEffect(() => {
    greetings();
  }, []);

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
