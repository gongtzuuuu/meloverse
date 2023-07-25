"use client";

import { useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";

export const GlobalSongContext = createContext();

const GlobalSongProvider = ({ children }) => {
  const { data: session } = useSession();
  const [globalPlaySong, setGlobalPlaySong] = useState(null);
  const [mySavedSongs, setMySavedSongs] = useState(null);

  // Get user's current playing song
  const getCurrentlyPlaying = async () => {
    if (session && session.accessToken) {
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
        data ? setGlobalPlaySong(data) : setGlobalPlaySong(mySavedSongs[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Get user's saved songs
  const fetchMySavedSongs = async () => {
    if (session && session.accessToken) {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/tracks", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        setMySavedSongs(data.items);
      } catch (error) {
        console.log("Error from fetching user's playlist");
      }
    }
  };

  useEffect(() => {
    if (session && session.accessToken) {
      fetchMySavedSongs();
      getCurrentlyPlaying();
    }
    console.log("mySavedSongs", mySavedSongs);
    console.log("globalPlaySong", globalPlaySong);
  }, [session]);

  return (
    <GlobalSongContext.Provider
      value={{
        globalPlaySong,
        setGlobalPlaySong,
        mySavedSongs,
        setMySavedSongs,
      }}
    >
      {children}
    </GlobalSongContext.Provider>
  );
};

export default GlobalSongProvider;
