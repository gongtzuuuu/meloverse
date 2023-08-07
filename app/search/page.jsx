"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import SongCard from "@components/SongCard";

const SearchResultList = ({ searchResult }) => {
  if (searchResult)
    return (
      <div className="mt-10 prompt_layout">
        {searchResult.map((eachTrack) => (
          <SongCard
            key={eachTrack.id}
            id={eachTrack.id}
            name={eachTrack.name}
            artist={eachTrack.artists[0].name}
            albumImg={eachTrack.album.images[0].url}
          />
        ))}
      </div>
    );
};

const SearchResult = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // This is the [ array ] passing to the api
  const [searchResultData, setSearchResultData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (response.ok && response.status === 200) {
        const data = await response.json();
        Array.isArray(data.tracks.items)
          ? setSearchResultData(data.tracks.items)
          : setSearchResultData([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (query) handleSearch();
  }, [query]);

  useEffect(() => {
    setSearchResult(searchResultData);
  }, [searchResultData]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Search result: {query}</span>
      </h1>
      <SearchResultList searchResult={searchResult} />
      <div className="h-32"></div>
    </section>
  );
};

export default SearchResult;
