"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalSongContext } from "@context/GlobalSongProvider";

import { BarsArrowUpIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import spotifyLogo from "../public/assets/images/Spotify_Logo.png";
import Image from "next/image";

const Player = () => {
  const router = useRouter();
  const { globalPlaySong, handleLikeSong, addToQueue } =
    useContext(GlobalSongContext);

  const handleAddPost = () => {
    router.push(`/details/${globalPlaySong.id}`);
  };

  return (
    <section className="player">
      <div className="w-full flex items-start gap-5">
        {globalPlaySong ? (
          <div className="w-full flex-1 flex justify-between items-center gap-3">
            {/* ---------------- */}
            {/* Song Detail Area */}
            {/* ---------------- */}
            <div className="flex gap-5">
              <div className="flex justify-center items-center">
                <Image
                  src={globalPlaySong.albumImg}
                  alt="album_image"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-satoshi font-semibold text-gray-900 line-clamp-1">
                  {globalPlaySong.name}
                </h3>
                <p className="font-inter text-sm text-gray-700">
                  {globalPlaySong.artist}
                </p>
              </div>
            </div>
            {/* ----------- */}
            {/* Button Area */}
            {/* ----------- */}
            <div className="flex justify-center items-center gap-3">
              {/* --------------- */}
              {/* Add Post Button */}
              {/* --------------- */}
              <div
                onClick={handleAddPost}
                title="Add Post"
                className="copy_btn"
              >
                <DocumentPlusIcon width={30} height={30} />
              </div>
              {/* ------------- */}
              {/* Like the song */}
              {/* ------------- */}
              <div
                className="copy_btn"
                title="Save the song"
                onClick={() => handleLikeSong(globalPlaySong.id)}
              >
                <HeartIcon width={30} height={30} />
              </div>
              {/* -------------------------- */}
              {/* Add track to Spotify queue */}
              {/* -------------------------- */}
              <div
                className="copy_btn"
                title="Add to Queue"
                onClick={() => {
                  addToQueue(globalPlaySong.id);
                }}
              >
                <BarsArrowUpIcon width={30} height={30} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>
              This is seamlessly integrated with{" "}
              <Image
                src={spotifyLogo}
                alt="Spotify Logo"
                height={40}
                width={80}
                className="inline"
              />{" "}
              API. Login to unlock the ultimate service.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Player;
