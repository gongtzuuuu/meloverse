import { useContext } from "react";
import { GlobalSongContext } from "../context/GlobalSongProvider";
import { BarsArrowUpIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const SongDetail = ({ id, name, artist, albumImg, setToggleShow }) => {
  const { setGlobalPlaySong, handleLikeSong, addToQueue } =
    useContext(GlobalSongContext);

  return (
    <div className="w-full max-w-2xl flex items-center sm:flex-wrap ">
      {/* ------------ */}
      {/* Picture Area */}
      {/* ------------ */}
      <div className="">
        <Image
          src={albumImg}
          alt="album image"
          width={150}
          height={150}
          className="rounded-lg"
        />
      </div>
      <div className="prompt_card ml-2">
        {/* ------------------- */}
        {/* Text & Buttons Area */}
        {/* ------------------- */}
        <p className="my-2 font-satoshi text-md font-semibold">{name}</p>
        <p className="my-2 font-satoshi text-md text-gray-700">{artist}</p>
        <div className="my-2 gap-3 flex items-center">
          {/* --- Add to queue --- */}
          <div
            title="Open editor"
            onClick={() => {
              setToggleShow((prev) => !prev);
            }}
          >
            <PlusCircleIcon width={30} height={30} className="copy_btn" />
          </div>
          {/* --- Like the song --- */}
          <div
            className="copy_btn"
            title="Save the song"
            onClick={() => handleLikeSong(id)}
          >
            <HeartIcon width={30} height={30} />
          </div>
          {/* --- Add to queue --- */}
          <div
            className="copy_btn"
            title="Add to Queue"
            onClick={() => {
              setGlobalPlaySong({
                id: id,
                name: name,
                artist: artist,
                albumImg: albumImg,
              });
              addToQueue(id);
            }}
          >
            <BarsArrowUpIcon width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
