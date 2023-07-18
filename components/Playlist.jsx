/* A re-usable playlist component */
import PlaylistCard from "./PlaylistCard";

const Playlist = ({ data }) => {
  return (
    <>
      <h1>My Playlist</h1>

      <div className="mt-10 prompt_layout">
        {data.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </>
  );
};

export default Playlist;
