import Image from "next/image";
import { PlusCircleIcon, HeartIcon } from "@heroicons/react/24/solid";

const SongCard = ({ eachTrack }) => {
  return (
    <div className="prompt_card flex item-center">
      <Image width={50} height={50} src={eachTrack.track.album.images[0].url} />
      <div className="flex flex-col pl-2">
        <p className="font-satoshi font-semibold text-gray-900">
          {eachTrack.track.name}
        </p>
        <p className="font-inter text-sm text-gray-500">
          {eachTrack.track.artists[0].name}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
