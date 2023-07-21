"use client";

import Image from "next/image";
import { useState } from "react";
import {
  PlayCircleIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const SongDetail = ({ songInfo, setToggleShow }) => {
  if (songInfo)
    return (
      <>
        <div className="flex flex-col">
          <p>{songInfo.name}</p>
          <p>{songInfo.artists[0].name}</p>
          <Image
            src={songInfo.album.images[0].url}
            alt="album image"
            width={200}
            height={200}
          />
          <div className="flex">
            <div className="copy_btn">
              <PlayCircleIcon
                width={30}
                height={30}
                className="cursor-pointer"
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
            <div className="copy_btn">
              <HeartIcon width={30} height={30} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </>
    );
};

export default SongDetail;