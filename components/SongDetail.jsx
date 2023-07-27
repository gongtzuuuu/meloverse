"use client";

import { useContext } from "react";
import { GlobalSongContext } from "./GlobalSongProvider";
import Image from "next/image";
import { PlayCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const SongDetail = ({ id, name, artist, albumImg, setToggleShow }) => {
  const { setGlobalPlaySong } = useContext(GlobalSongContext);
  return (
    <div className="flex items-center">
      {/* Song details */}
      <Image src={albumImg} alt="album image" width={150} height={150} />
      <div className="prompt_card">
        <p className="my-2 font-satoshi text-md font-semibold">{name}</p>
        <p className="my-2 font-satoshi text-md text-gray-700">{artist}</p>
        {/* Edit buttons */}
        <div className="flex my-2">
          <div className="copy_btn">
            <PlayCircleIcon
              width={30}
              height={30}
              className="cursor-pointer"
              onClick={() => {
                setGlobalPlaySong(id);
              }}
            />
          </div>
          <div className="copy_btn">
            <PlusCircleIcon
              width={30}
              height={30}
              className="cursor-pointer"
              onClick={() => {
                setToggleShow((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
