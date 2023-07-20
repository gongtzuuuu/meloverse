/* Not a profile page but a re-usable profile component */

import PostCard from "./PostCard";
import SongCard from "./SongCard";

const SongCardList = ({ mySavedTracks }) => {
  return (
    <div className="mt-10 prompt_layout">
      {mySavedTracks.map((eachTrack) => (
        <SongCard key={eachTrack.track.id} eachTrack={eachTrack} />
      ))}
    </div>
  );
};

const PostCardList = ({ postData, handleEdit, handleDelete }) => {
  return (
    <div className="mt-10 prompt_layout">
      {postData.map((eachPost) => (
        <PostCard
          key={eachPost._id}
          postData={eachPost}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const Profile = ({
  name,
  desc,
  myPosts,
  mySavedTracks,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="feed">
        <h1>Your post...</h1>
        <PostCardList
          postData={myPosts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <div className="feed">
        <h1>Liked songs...</h1>
        <SongCardList mySavedTracks={mySavedTracks} />
      </div>
    </section>
  );
};

export default Profile;
