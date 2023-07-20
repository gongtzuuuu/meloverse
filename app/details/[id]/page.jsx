"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SongDetail from "@components/SongDetail";

const Detail = ({ params }) => {
  const { data: session } = useSession();
  const [songInfo, setSongInfo] = useState(null);

  // Fetch song's info
  const fetchSongInfo = async () => {
    if (session && session.accessToken) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setSongInfo(data);
        console.log("songInfo", songInfo);
      } catch (error) {
        console.log("Error from fetching song detail", error);
      }
    }
  };

  useEffect(() => {
    fetchSongInfo();
  }, [session]);

  return (
    <section className="w-full">
      <SongDetail songInfo={songInfo} />
    </section>
  );
};

export default Detail;
