"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div>
      {data.map((post) => (
        <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  //Fetch all posts
  const [allPosts, setAllPosts] = useState([]);

  //Search states
  const [searchText, setSearchText] = useState("");

  const fetchPosts = async () => {
    const reponse = await fetch("/api/post");
    const data = await reponse.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {};

  const handleTagClick = () => {
    console.log("handle tag clicked!");
  };

  return (
    <section className="feed">
      <form className="relatve w-full flex-center">
        <input
          type="text"
          placeholder="Search for a post, username or a tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PostCardList data={allPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
