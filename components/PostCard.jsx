"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";

const ShowHideButton = ({ showHide, isTextHidden }) => {
  const buttonRef = useRef();

  return (
    <button
      ref={buttonRef}
      onClick={showHide}
      className="text-start text-sm text-slate-500"
    >
      {isTextHidden ? "read more" : "read less"}
    </button>
  );
};

const PostCard = ({ postData, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [isTextHidden, setIsTextHidden] = useState(true);
  const [isButton, setIsButton] = useState(false);
  const textRef = useRef(null);

  function showHide() {
    if (textRef.current.classList.contains("line-clamp-5")) {
      setIsTextHidden(false);
      textRef.current.classList.remove("line-clamp-5");
      textRef.current.classList.add("line-clamp-none");
    } else {
      setIsTextHidden(true);
      textRef.current.classList.remove("line-clamp-none");
      textRef.current.classList.add("line-clamp-5");
    }
  }

  useEffect(() => {
    textRef.current.scrollHeight > textRef.current.clientHeight
      ? setIsButton(true)
      : setIsButton(false);
  }, []);

  if (postData)
    return (
      <div className="prompt_card">
        <div className="flex flex-col item-center">
          {/* Song Detail */}
          {pathName !== `/details/${postData.songId}` && (
            <Link href={`/details/${postData.songId}`}>
              <div className="flex items-center relative">
                <div>
                  <Image
                    src={postData.songDetail.album_img}
                    alt="album image"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <p className="font-satoshi text-sm font-semibold">
                    {postData.songDetail.name}
                  </p>
                  <p className="font-satoshi text-sm text-gray-700">
                    {postData.songDetail.artist}
                  </p>
                </div>
              </div>
            </Link>
          )}
          {/* Post Detail */}
          <div className="my-4 flex flex-col">
            <p
              ref={textRef}
              className="my-4 font-satoshi text-gray-700 line-clamp-5 transition duration-300"
            >
              {postData.post}
            </p>
            {isButton ? (
              <ShowHideButton showHide={showHide} isTextHidden={isTextHidden} />
            ) : (
              ""
            )}
            <div className="flex flex-wrap my-4">
              {postData.tag.map((eachTag) => (
                <Link key={uuidv4()} href={`/search/${eachTag}`}>
                  <p className="mr-2 font-inter text-sm blue_gradient cursor-pointer">
                    #{eachTag}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          {/* Post creator */}
          <Link href={`/profile/${postData.userId._id}`}>
            <div className="flex-1 flex justify-start items-center gap-3">
              <Image
                src={postData.userId.image}
                alt="user_image"
                width={20}
                height={20}
                className="rounded-full object-contain"
              />
              <h3 className="my-4 font-satoshi text-sm text-gray-700">
                {postData.userId.username}
              </h3>
            </div>
          </Link>
          {/* Post edit & delete button */}
          {/* Check (1) If the current login user is the creator of the post */}
          {/* Check (2) If the user is currently in the profile page */}
          {session?.user.id === postData.userId._id &&
            pathName === "/profile" && (
              <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                <Link href={`/post/${postData._id}`}>
                  <p className="outline_btn cursor-pointer">Edit</p>
                </Link>
                <p
                  className="outline_btn cursor-pointer"
                  onClick={() => {
                    handleDelete(postData);
                  }}
                >
                  Delete
                </p>
              </div>
            )}
        </div>
      </div>
    );
};

export default PostCard;
