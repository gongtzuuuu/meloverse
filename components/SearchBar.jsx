"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ setToggleDropdown }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    const searchQuery = e.target.value;
    setInputValue((prev) => searchQuery);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${inputValue}`);
    setInputValue("");
    setToggleDropdown(false);
  };

  return (
    <form
      action="/search"
      method="POST"
      onSubmit={handleSearch}
      className="dropdown relatve w-full flex-center"
    >
      <label htmlFor="search"></label>
      <input
        name="search"
        type="text"
        className="search_input peer"
        value={inputValue}
        onChange={handleInput}
        placeholder="Search for songs or artists"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
