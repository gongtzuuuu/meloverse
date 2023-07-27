import { useContext } from "react";
import { GlobalSongContext } from "@components/GlobalSongProvider";
import SongCard from "@components//SongCard";

const SongCardList = () => {
  const { mySavedSongs } = useContext(GlobalSongContext);
  if (mySavedSongs)
    return (
      <div className="mt-10 prompt_layout">
        {mySavedSongs.map((eachTrack) => (
          <SongCard
            key={eachTrack.track.id}
            id={eachTrack.track.id}
            name={eachTrack.track.name}
            artist={eachTrack.track.artists[0].name}
            albumImg={eachTrack.track.album.images[0].url}
          />
        ))}
      </div>
    );
};

/* Feed: text + postcards */
const SongFeed = ({ text }) => {
  return (
    <section className="feed">
      <h1 className="font-satoshi font-semibold text-lg orange_gradient">
        {text}
      </h1>
      <SongCardList />
    </section>
  );
};

export default SongFeed;
