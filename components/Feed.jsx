"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-5 prompt_layout">
      {data.map((post) => (
        <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = ({ data, text }) => {
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchResults, setSearchResults] = useState("");

  const handleSearchChange = (e) => {};

  const handleTagClick = () => {
    console.log("handle tag clicked!");
  };

  return (
    <section className="feed">
      {/* <form className="relatve w-full flex-center">
        <input
          type="text"
          placeholder="Search for a post, username or a tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form> */}
      <h1>{text}</h1>
      <PostCardList data={data} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
