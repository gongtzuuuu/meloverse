"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { set } from "mongoose";

const Player = () => {
  const { data: session } = useSession();
  const [globalCurrentSong, setGlobalCurrentSong] = useState({
    id: "",
    name: "",
    artist: "",
    albumImage_url: "",
  });
  const [songInfo, setSongInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch song's details
  const fetchSongInfo = async (songId) => {
    const reponse = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const data = await reponse.json();
    setSongInfo(data);
  };

  // Get current playing song
  const getCurrentlyPlaying = async () => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await response.json();

      const theSong = {
        id: data.item.id,
        name: data.item.name,
        artist: data.item.artists[0].name,
        albumImage_url: data.item.album.images[0].url,
      };

      setGlobalCurrentSong(theSong);

      console.log("globalCurrentSong", globalCurrentSong);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle play or pause the song
  const handlePlayPause = async () => {
    setIsPlaying((prev) => !prev);
    // try {
    //   // If a user logged in, then get the current playing song
    //   if (session && session.accessToken) {
    //     const data = await getCurrentlyPlaying();
    //     console.log("Current playing song from hte looged in user", data);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    if (session && session.accessToken) {
      getCurrentlyPlaying();
    }
  }, [session]);

  return (
    <section className="player" style={{ border: "1px solid black" }}>
      <div className="flex justify-between items-start gap-5">
        {session?.user ? (
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={globalCurrentSong.albumImage_url}
              width={30}
              height={30}
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {globalCurrentSong.name}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {globalCurrentSong.artist}
              </p>
            </div>
            <div className="copy_btn" onClick={handlePlayPause}>
              {isPlaying ? (
                <PauseCircleIcon className="h-40 w-40 cursor-pointer" />
              ) : (
                <PlayCircleIcon className="h-40 w-40 cursor-pointer" />
              )}
            </div>
            <div className="copy_btn" onClick={handlePlayPause}>
              <PlusCircleIcon className="h-40 w-40 cursor-pointer" />
            </div>
          </div>
        ) : (
          <h1>User doesn't login in</h1>
        )}
      </div>
    </section>
  );
};

export default Player;
