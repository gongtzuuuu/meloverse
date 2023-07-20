"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";

const PostCardList = ({ postData, handleTagClick }) => {
  return (
    <div className="mt-5 prompt_layout">
      {postData.map((post) => (
        <PostCard
          key={post._id}
          postData={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = ({ postData, text }) => {
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
      <h1>{text}</h1>
      {postData ? (
        <PostCardList postData={postData} handleTagClick={handleTagClick} />
      ) : (
        <></>
      )}
    </section>
  );
};

export default Feed;
