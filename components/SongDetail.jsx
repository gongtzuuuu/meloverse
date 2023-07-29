import { useContext } from "react";
import { GlobalSongContext } from "./GlobalSongProvider";
import {
  PlayCircleIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

// globalPlaySong,
// setGlobalPlaySong,
// isPlaying,
// setIsPlaying,
// mySavedSongs,
// setMySavedSongs,
// /* */
// handleLikeSong,
// handlePlay,
// handlePause,
// addToQueue,
// skipToNext,

const SongDetail = ({ id, name, artist, albumImg, setToggleShow }) => {
  const {
    setGlobalPlaySong,
    setIsPlaying,
    handleLikeSong,
    handlePlay,
    addToQueue,
    skipToNext,
  } = useContext(GlobalSongContext);

  // handle to like the song
  // const handleLikeSong = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.spotify.com/v1/me/tracks?ids=${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${session.accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         method: "PUT",
  //       }
  //     );
  //     console.log("", response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex items-center">
      {/* ------------ */}
      {/* Song details */}
      {/* ------------ */}
      <Image src={albumImg} alt="album image" width={150} height={150} />
      <div className="prompt_card">
        <p className="my-2 font-satoshi text-md font-semibold">{name}</p>
        <p className="my-2 font-satoshi text-md text-gray-700">{artist}</p>
        {/* ----------- */}
        {/* Button area */}
        {/* ----------- */}
        <div className="flex my-2 sm:gap-3">
          <div
            className="copy_btn"
            onClick={() => {
              setGlobalPlaySong({
                id: id,
                name: name,
                artist: artist,
                albumImg: albumImg,
              });
              addToQueue(id);
              skipToNext();
              handlePlay();
              setIsPlaying(true);
            }}
          >
            <PlayCircleIcon width={30} height={30} className="cursor-pointer" />
          </div>
          <div
            className="copy_btn"
            onClick={() => {
              setToggleShow((prev) => !prev);
            }}
          >
            <PlusCircleIcon width={30} height={30} className="cursor-pointer" />
          </div>
          <div className="copy_btn" onClick={() => handleLikeSong(id)}>
            <HeartIcon width={30} height={30} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
