"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalSongContext } from "@components/GlobalSongProvider";
import Image from "next/image";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const Player = () => {
  const router = useRouter();
  const {
    globalPlaySong,
    isPlaying,
    setIsPlaying,
    handleLikeSong,
    handlePlay,
    handlePause,
  } = useContext(GlobalSongContext);

  const handleAddPost = () => {
    router.push(`/details/${globalPlaySong.id}`);
  };

  return (
    <section className="player">
      <div className="w-full flex items-start gap-5">
        {globalPlaySong ? (
          <div className="w-full flex-1 flex justify-between items-center gap-3 cursor-pointer">
            {/* ---------------- */}
            {/* Song Detail Area */}
            {/* ---------------- */}
            <div className="flex gap-5">
              <div className="flex justify-center items-center">
                <Image
                  src={globalPlaySong.albumImg}
                  alt="album_image"
                  width={30}
                  height={30}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-satoshi font-semibold text-gray-900">
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
            <div className="flex justify-center items-center sm:gap-3">
              {/* ---------------------- */}
              {/* Play or pause the song */}
              {/* ---------------------- */}
              {isPlaying ? (
                <div
                  className="copy_btn"
                  onClick={() => {
                    handlePause();
                    setIsPlaying(false);
                  }}
                >
                  <PauseCircleIcon
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                </div>
              ) : (
                <div
                  className="copy_btn"
                  onClick={() => {
                    handlePlay();
                    setIsPlaying(true);
                  }}
                >
                  <PlayCircleIcon
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                </div>
              )}
              {/* --------------- */}
              {/* Add Post Button */}
              {/* --------------- */}
              <div className="copy_btn" onClick={handleAddPost}>
                <PlusCircleIcon
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </div>
              {/* ------------- */}
              {/* Like the song */}
              {/* ------------- */}
              <div
                className="copy_btn"
                onClick={() => handleLikeSong(globalPlaySong.id)}
              >
                <HeartIcon width={30} height={30} className="cursor-pointer" />
              </div>
            </div>
          </div>
        ) : (
          <h1>Please login with Spotify account</h1>
        )}
      </div>
    </section>
  );
};

export default Player;
