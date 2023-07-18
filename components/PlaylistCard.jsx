"use client";

import Image from "next/image";

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="prompt_card">
      <div className="flex flex-col justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={playlist.images[0].url}
            alt="playlist_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <h1>{playlist.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
