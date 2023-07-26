"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ setToggleDropdown }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleInputQuery = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    router.push(`/search?q=${inputValue}`);
    setInputValue("");
    setToggleDropdown(false);
  };

  return (
    <form
      action="/search"
      method="post"
      onSubmit={handleSearch}
      className="dropdown relatve w-full flex-center"
    >
      <label htmlFor="search"></label>
      <input
        name="search"
        type="text"
        className="search_input peer"
        value={inputValue}
        onChange={handleInputQuery}
        placeholder="Search for songs or artists"
        required
      />
    </form>
  );
};

export default SearchBar;
