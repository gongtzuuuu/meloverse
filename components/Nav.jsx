"use client";

import { useState, useEffect } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@components/SearchBar";
import logo from "../public/assets/images/meloverse2.png";

const Nav = () => {
  //Show different nav links according to login status with session
  const { data: session } = useSession();
  //Get the currently configured authentication providers from /api/auth/providers
  const [providers, setProviders] = useState(null);
  //Set toggle Dropdown function for mobile nav menu
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders(); //Data: array
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="meloverse Logo"
          width={45}
          height={45}
          className="object-contain rounded-full"
        />
        <p className="logo_text black_gradient">meloverse</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 relative">
            <button
              className="outline_btn"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            >
              Search
            </button>
            {toggleDropdown && (
              <SearchBar setToggleDropdown={setToggleDropdown} />
            )}
            {/* If the profile picture is clicked */}
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {/* Check if we have provider */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Login
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
