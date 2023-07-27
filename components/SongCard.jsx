import Image from "next/image";
import Link from "next/link";

const SongCard = ({ id, name, artist, albumImg }) => {
  return (
    <Link href={`/details/${id}`} className="prompt_card flex item-center">
      <Image width={40} height={40} src={albumImg} alt="album image" />
      <div className="flex flex-col pl-2">
        <p className="font-satoshi text-sm font-semibold">{name}</p>
        <p className="font-satoshi text-sm text-gray-700">{artist}</p>
      </div>
    </Link>
  );
};

export default SongCard;
