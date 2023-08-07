"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@components/SearchBar";
import logo from "../public/favicon.png";

const Nav = () => {
  //Show different nav links according to login status with session
  const { data: session } = useSession();
  console.log("session from nav", session);
  //Get the currently configured authentication providers from /api/auth/providers
  const [providers, setProviders] = useState(null);
  //Set toggle Dropdown function for mobile nav menu
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // useEffect(() => {
  //   const setUpProviders = async () => {
  //     const response = await getProviders(); //Data: array
  //     response && setProviders(response);
  //   };
  //   setUpProviders();
  // }, []);

  // useEffect(() => {
  //   if (session?.error === "RefreshAccessTokenError" && providers) {
  //     Object.values(providers).map(
  //       (provider) => signIn(provider.id) // Force sign in to hopefully resolve error
  //     );
  //     signIn();
  //   }
  // }, [session]);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* --------- */}
      {/* Logo Area */}
      {/* --------- */}
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
      {/* --------------- */}
      {/* Navigation Area */}
      {/* --------------- */}
      <div className="sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 relative">
            {/* --- Profile Picture --- */}
            <Link href={`/profile/${session?.user.id}`}>
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
            {/* --- Search Button --- */}
            <button
              className="outline_btn"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            >
              Search
            </button>
            {/* --- Search Bar --- */}
            {toggleDropdown && (
              <SearchBar setToggleDropdown={setToggleDropdown} />
            )}
            {/* --- Logout Button --- */}
            <button type="button" onClick={signOut} className="outline_btn">
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* Check if we have provider */}
            {/*providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Login
                </button>
              )) */}
            {/* --- Login Button --- */}
            <button
              type="button"
              onClick={() => signIn("spotify", { callbackUrl: "/" })}
              className="black_btn"
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
