import Image from "next/image";
import React from "react";

const SongDetail = ({ songInfo }) => {
  if (songInfo)
    return (
      <div className="feed">
        <p>{songInfo.name}</p>
        <p>{songInfo.artists[0].name}</p>
        <Image
          src={songInfo.album.images[0].url}
          alt="album image"
          width={200}
          height={200}
        />
      </div>
    );
};

export default SongDetail;
