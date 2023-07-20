import Image from "next/image";
import Link from "next/link";
import { PlusCircleIcon, HeartIcon } from "@heroicons/react/24/solid";

const SongCard = ({ eachTrack }) => {
  return (
    <Link
      href={`/details/${eachTrack.track.id}`}
      className="prompt_card flex item-center"
    >
      <Image
        width={50}
        height={50}
        src={eachTrack.track.album.images[0].url}
        alt="album image"
      />
      <div className="flex flex-col pl-2">
        <p className="font-satoshi font-semibold text-gray-900">
          {eachTrack.track.name}
        </p>
        <p className="font-inter text-sm text-gray-500">
          {eachTrack.track.artists[0].name}
        </p>
      </div>
    </Link>
  );
};

export default SongCard;
