"use client";

import { useEffect, useState, useContext } from "react";
import { GlobalSongContext } from "./GlobalSongProvider";
import Image from "next/image";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const Player = () => {
  const { globalPlaySong, setGlobalPlaySong } = useContext(GlobalSongContext);
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

  // Handle play or pause the song
  const handlePlayPause = async () => {
    setIsPlaying((prev) => !prev);
  };

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
  const playSong = async (songId) => {
    setGlobalCurrentSongId(track.id);
    setGlobalIsTrackPlaying(true);
    if (session && session.accessToken) {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/play",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            uris: [track.uri],
          }),
        }
      );
      console.log("on play", response.status);
    }
  };

  // let { globalPlaySong, setGlobalPlaySong } = useContext(GlobalSongContext);
  // useEffect(() => {
  //   console.log(globalPlaySong);
  //   setGlobalPlaySong("new song");
  //   console.log(globalPlaySong);
  //   if (session && session.accessToken) {
  //     getCurrentlyPlaying();
  //   }
  // }, []);

  return (
    <section className="player" style={{ border: "1px solid black" }}>
      <div className="flex justify-between items-start gap-5">
        {globalPlaySong ? (
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={globalPlaySong.item.album.images[0].url}
              alt="album_image"
              width={30}
              height={30}
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {globalPlaySong.item.name}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {globalPlaySong.item.artists[0].name}
              </p>
            </div>
            <div className="copy_btn" onClick={handlePlayPause}>
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
            <div className="copy_btn" onClick={handlePlayPause}>
              <PlusCircleIcon
                width={30}
                height={30}
                className="cursor-pointer"
              />
            </div>
            <div className="copy_btn" onClick={handleLikeSong}>
              <HeartIcon width={30} height={30} className="cursor-pointer" />
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
