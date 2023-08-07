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
  const [mySavedSongs, setMySavedSongs] = useState([]);

  // ***************************
  // Get Currently Playing Track
  // ***************************
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
        if (response.status === 200) {
          const data = await response.json();
          if (data.item) {
            const filteredData = {
              id: data.item.id,
              name: data.item.name,
              artist: data.item.artists[0].name,
              albumImg: data.item.album.images[0].url,
            };
            setCurrentlyPlaying(filteredData);
          } else {
            setCurrentlyPlaying(null);
          }
        } else {
          setCurrentlyPlaying(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // **************************
  // Get Recently Played Tracks
  // **************************
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
        if (response.status === 200 && response.ok) {
          const data = await response.json();
          const filteredData = {
            id: data.items[0].track.id,
            name: data.items[0].track.name,
            artist: data.items[0].track.artists[0].name,
            albumImg: data.items[0].track.album.images[0].url,
          };
          setRecentlyPlayed(filteredData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ***********************
  // Get User's Saved Tracks
  // ***********************
  const fetchMySavedSongs = async () => {
    if (session && session.accessToken) {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/tracks", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        // - check response status & if data.items exists
        if (response.status === 200 && response.ok) {
          const data = await response.json();
          data.items && setMySavedSongs(data.items);
        }
      } catch (error) {
        console.log("Error from fetching user's playlist");
      }
    } else {
    }
  };

  // ****************************
  // Save Tracks for Current User
  // ****************************
  const handleLikeSong = async (id) => {
    if (session && session.accessToken) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/tracks?ids=${id}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              "Content-Type": "application/json",
            },
            method: "PUT",
          }
        );
        if (response.status === 200) {
          confirm("The song is liked!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // *********************
  // Start/Resume Playback
  // *********************
  const handlePlay = async () => {
    if (session && session.accessToken) {
      try {
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
      } catch (error) {
        console.log("Error from playing the song", error);
      }
    }
  };

  // **************
  // Pause Playback
  // **************
  const handlePause = async () => {
    if (session && session.accessToken) {
      try {
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
      } catch (error) {
        console.log("Error from pausing the song", error);
      }
    }
  };

  // ***************************
  // Add Track to Playback Queue
  // ***************************
  const addToQueue = async (id) => {
    if (session && session.accessToken) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${id}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            method: "POST",
          }
        );
        return response;
      } catch (error) {
        console.log("Error from adding the song to playback queue", error);
      }
    }
  };

  // ***************************************
  // Skips to next track in the user’s queue
  // ***************************************
  const skipToNext = async () => {
    if (session && session.accessToken) {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/next",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            method: "POST",
          }
        );
        return response;
      } catch (error) {
        console.log("Error from skipping to next track", error);
      }
    }
  };

  useEffect(() => {
    getCurrentlyPlaying();
    getRecentlyPlayed();
    fetchMySavedSongs();
  }, [session]);

  useEffect(() => {
    currentlyPlaying
      ? setGlobalPlaySong(currentlyPlaying)
      : setGlobalPlaySong(recentlyPlayed);
  }, [currentlyPlaying, recentlyPlayed]);

  useEffect(() => {
    globalPlaySong && globalPlaySong.isPlaying
      ? setIsPlaying(true)
      : setIsPlaying(false);
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
        /* */
        handleLikeSong,
        handlePlay,
        handlePause,
        addToQueue,
        skipToNext,
      }}
    >
      {children}
    </GlobalSongContext.Provider>
  );
};

export default GlobalSongProvider;
