"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PostCard = ({ postData, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copiedText, setCopiedText] = useState("");

  const handleCopy = () => {
    setCopiedText(postData.post);
    navigator.clipboard.writeText(postData.post);
    setTimeout(() => setCopiedText(false), 3000); //Why do we set false here?
  };

  if (postData)
    return (
      <Link href={`/details/${postData.songId}`}>
        <div className="prompt_card">
          <div className="flex justify-between items-start gap-5">
            {pathName !== `/details/${postData.songId}` && (
              <div className="flex flex-col">
                {/* Song detail display */}
                <p>{postData.songDetail.name}</p>
                <p>{postData.songDetail.artist}</p>
                <Image
                  src={postData.songDetail.album_img}
                  alt="album image"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <div>
              {pathName !== "/profile" && (
                <div>
                  <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    {/* Creator detail display - image */}
                    <Image
                      src={postData.userId.image}
                      alt="user_image"
                      width={40}
                      height={40}
                      className="rounded-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-satoshi font-semibold text-gray-900">
                      {postData.userId.username}
                    </h3>
                    <p className="font-inter text-sm text-gray-500">
                      {postData.userId.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Copy button */}
            <div className="copy_btn" onClick={handleCopy}>
              <Image
                src={
                  copiedText
                    ? "/assets/icons/tick.svg"
                    : "/assets/icons/copy.svg"
                }
                alt={copiedText === postData.post ? "tick_icon" : "copy_icon"}
                width={12}
                height={12}
              />
            </div>
          </div>

          <p className="my-4 font-satoshi text-sm text-gray-700">
            {postData.post}
          </p>
          <p className="font-inter text-sm blue_gradient cursor-pointer">
            {postData.tag}
          </p>

          {/* Check (1) If the current login user is the creator of the post
        {/* Check (2) If the user is currently in the profile page */}
          {session?.user.id === postData.userId._id &&
            pathName === "/profile" && (
              <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                <p
                  className="font-inter text-sm green_gradient cursor-pointer"
                  onClick={handleEdit}
                >
                  Edit
                </p>
                <p
                  className="font-inter text-sm orange_gradient cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </p>
              </div>
            )}
        </div>
      </Link>
    );
};

export default PostCard;
