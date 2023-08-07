"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PostCard from "@components/PostCard";

const SearchHashtagResultList = ({ searchResult }) => {
  if (searchResult)
    return (
      <div className="mt-10 prompt_layout">
        {searchResult.map((eachPost) => (
          <PostCard key={eachPost._id} postData={eachPost} />
        ))}
      </div>
    );
};

const SearchHashtagResult = ({ params }) => {
  const { data: session } = useSession();
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/post/hashtag/${params.hashtag}`);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        Array.isArray(data) ? setSearchResult(data) : setSearchResult([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (session) handleSearch();
  }, [session]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">#{params.hashtag}</span>
      </h1>
      <SearchHashtagResultList searchResult={searchResult} />
      <div className="h-32"></div>
    </section>
  );
};

export default SearchHashtagResult;
