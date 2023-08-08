"use client";

import { useContext } from "react";
import { GlobalPostContext } from "@context/GlobalPostProvider";
import Greetings from "@components/Greetings";
import PostFeed from "@components/PostFeed";

const Home = () => {
  // Get posts
  const { globalAllPosts } = useContext(GlobalPostContext);

  return (
    <section className="w-full flex-center flex-col">
      <Greetings />
      {globalAllPosts.length > 0 && (
        <PostFeed text={"Trending Posts"} postData={globalAllPosts} />
      )}
      <div className="h-32"></div>
    </section>
  );
};

export default Home;
