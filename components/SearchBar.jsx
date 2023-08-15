"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleDropdown = () => {
    setToggleDropdown((prev) => !prev);
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${inputValue}`);
    setToggleDropdown(false);
    setInputValue("");
  };

  return (
    <>
      <button className="outline_btn" onClick={handleDropdown}>
        Search
      </button>
      {toggleDropdown && (
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
        </form>
      )}
    </>
  );
};

export default SearchBar;
