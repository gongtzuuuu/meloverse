"use client";

import { useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  const { globalPlaySong, setGlobalPlaySong, isPlaying, setIsPlaying } =
    useContext(GlobalSongContext);

  const handleAddPost = () => {
    router.push(`/details/${globalPlaySong.id}`);
  };

  // handle to like the song
  const handleLikeSong = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/tracks?ids=${globalPlaySong.id}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          method: "PUT",
        }
      );
      console.log("", response);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle to play or pause the song
  const handlePlayPause = async () => {
    setGlobalPlaySong(globalPlaySong);
    setIsPlaying((prev) => !prev);

    if (session && session.accessToken) {
      if (isPlaying) {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/pause",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        if (response.status == 204) {
          setIsPlaying(false);
        }
      } else {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/play",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        if (response.status == 204) {
          setIsPlaying(true);
        }
      }
    }
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
              <div className="copy_btn" onClick={handlePlayPause}>
                {/* ---------------------- */}
                {/* Play or pause the song */}
                {/* ---------------------- */}
                {isPlaying ? (
                  <PauseCircleIcon
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                ) : (
                  <PlayCircleIcon
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                )}
              </div>
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
              <div className="copy_btn" onClick={handleLikeSong}>
                <HeartIcon width={30} height={30} className="cursor-pointer" />
              </div>
            </div>
          </div>
        ) : (
          <h1>No current playing song on Spotify</h1>
        )}
      </div>
    </section>
  );
};

export default Player;
