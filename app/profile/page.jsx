"use client";

import { useState, useEffect, useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GlobalPostContext } from "@components/GlobalPostProvider";
import Profile from "@components/Profile";
import NotLogin from "@components/NotLogin";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { myPosts, handleEdit, handleDelete } = useContext(GlobalPostContext);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <>
      {session && session?.user ? (
        <>
          <Profile
            name="My"
            desc="Welcome to my personalised profile page"
            postData={myPosts}
            text={"Your posts"}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-5 black_btn mb-6"
          >
            Logout
          </button>
        </>
      ) : (
        <NotLogin />
      )}
      <div className="h-32"></div>
    </>
  );
};

export default MyProfile;
