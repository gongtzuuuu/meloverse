import Image from "next/image";
import Link from "next/link";

const SongCard = ({ id, name, artist, albumImg }) => {
  return (
    <Link href={`/details/${id}`} className="prompt_card flex item-center">
      <Image width={50} height={50} src={albumImg} alt="album image" />
      <div className="flex flex-col pl-2">
        <p className="font-satoshi font-semibold text-gray-900">{name}</p>
        <p className="font-inter text-sm text-gray-500">{artist}</p>
      </div>
    </Link>
  );
};

export default SongCard;
