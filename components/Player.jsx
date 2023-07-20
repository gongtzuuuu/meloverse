"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

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
    } catch (error) {
      console.log(error);
    }
  };

  // Handle play or pause the song
  const handlePlayPause = async () => {
    setIsPlaying((prev) => !prev);
  };

  // const isLiked = async () => {
  //   try {
  //     const response = await fetch(`/api/users/${session.user.id}/songs-liked`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLikeSong = async () => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id}/songs-liked`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            id: globalCurrentSong.id,
            name: globalCurrentSong.name,
            artist: globalCurrentSong.artist,
            image_url: globalCurrentSong.albumImage_url,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Successfully like the song");
    }
  };

  // Play a song
  // async function playSong(track) {
  //   setGlobalCurrentSongId(track.id);
  //   setGlobalIsTrackPlaying(true);
  //   if (session && session.accessToken) {
  //     const response = await fetch(
  //       "https://api.spotify.com/v1/me/player/play",
  //       {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${session.accessToken}`,
  //         },
  //         body: JSON.stringify({
  //           uris: [track.uri],
  //         }),
  //       }
  //     );
  //     console.log("on play", response.status);
  //   }
  // }

  useEffect(() => {
    if (session && session.accessToken) {
      getCurrentlyPlaying();
    }
  }, [session]);

  // useEffect(() => {
  //   isLiked();
  // }, [globalCurrentSong]);

  return (
    <section className="player" style={{ border: "1px solid black" }}>
      <div className="flex justify-between items-start gap-5">
        {session?.user ? (
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={globalCurrentSong.albumImage_url}
              alt="album_image"
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
            <div className="copy_btn" onClick={handleLikeSong}>
              <HeartIcon className="h-40 w-40 cursor-pointer" />
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
