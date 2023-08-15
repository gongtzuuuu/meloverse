import { useContext } from "react";
import { GlobalSongContext } from "../context/GlobalSongProvider";
import { BarsArrowUpIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

/* ----------------------------- */
/* --- Song Detail Component --- */
/* ----------------------------- */
const SongDetail = ({
  songId,
  songName,
  songArtist,
  songImg,
  setToggleShow,
}) => {
  const { setGlobalPlaySong, handleLikeSong, addToQueue } =
    useContext(GlobalSongContext);

  return (
    <div className="w-full max-w-2xl flex items-center sm:flex-wrap ">
      {/* --- Picture Area --- */}
      <div>
        <Image
          src={songImg}
          alt="album image"
          width={150}
          height={150}
          className="rounded-lg"
        />
      </div>
      <div className="prompt_card ml-2">
        {/* --- Text & Buttons Area --- */}
        <p className="my-2 font-satoshi text-md font-semibold">{songName}</p>
        <p className="my-2 font-satoshi text-md text-gray-700">{songArtist}</p>
        <div className="my-2 gap-3 flex items-center">
          {/* --- Open Editor --- */}
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
            onClick={() => handleLikeSong(songId)}
          >
            <HeartIcon width={30} height={30} />
          </div>
          {/* --- Add to queue --- */}
          <div
            className="copy_btn"
            title="Add to Queue"
            onClick={() => {
              setGlobalPlaySong({
                songId: songId,
                songName: songName,
                songArtist: songArtist,
                songImg: songImg,
              });
              addToQueue(songId);
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
