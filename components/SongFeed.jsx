import SongCard from "@components//SongCard";

const SongCardList = ({ songs }) => {
  if (songs)
    return (
      <div className="mt-10 prompt_layout">
        {songs.map((eachTrack) => (
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

const SongFeed = async ({ text, songs }) => {
  return (
    <div id="liked_songs" className="feed">
      <h1 className="font-satoshi font-semibold text-lg orange_gradient">
        {text}
      </h1>
      <SongCardList songs={songs} />
    </div>
  );
};

export default SongFeed;
