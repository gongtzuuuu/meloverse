"use client";

import { useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";

export const GlobalSongContext = createContext();

const GlobalSongProvider = ({ children }) => {
  const { data: session } = useSession();
  const [globalPlaySong, setGlobalPlaySong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
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
        const filteredData = {
          id: data.item.id,
          name: data.item.name,
          artist: data.item.artists[0].name,
          albumImg: data.item.album.images[0].url,
        };
        setCurrentlyPlaying(filteredData);
        if (data.isPlaying) setIsPlaying(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Get user's recently played song
  const getRecentlyPlayed = async () => {
    if (session && session.accessToken) {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played?limit=1",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        const filteredData = {
          id: data.items[0].track.id,
          name: data.items[0].track.name,
          artist: data.items[0].track.artists[0].name,
          albumImg: data.items[0].track.album.images[0].url,
        };
        setRecentlyPlayed(filteredData);
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
      getCurrentlyPlaying();
      getRecentlyPlayed();
      fetchMySavedSongs();
    }
  }, [session]);

  useEffect(() => {
    currentlyPlaying
      ? setGlobalPlaySong(currentlyPlaying)
      : setGlobalPlaySong(recentlyPlayed);
  }, [currentlyPlaying, recentlyPlayed]);

  useEffect(() => {
    console.log("globalPlaySong", globalPlaySong);
  }, [globalPlaySong]);

  return (
    <GlobalSongContext.Provider
      value={{
        globalPlaySong,
        setGlobalPlaySong,
        isPlaying,
        setIsPlaying,
        mySavedSongs,
        setMySavedSongs,
      }}
    >
      {children}
    </GlobalSongContext.Provider>
  );
};

export default GlobalSongProvider;
