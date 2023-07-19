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

const PostCardList = ({ myPosts, handleEdit, handleDelete }) => {
  console.log("PostCardList from PostCardList", myPosts);
  return (
    <div className="mt-10 prompt_layout">
      {myPosts.map((eachPost) => (
        <PostCard
          key={eachPost._id}
          eachPost={eachPost}
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

      <PostCardList
        myPosts={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <SongCardList mySavedTracks={mySavedTracks} />
    </section>
  );
};

export default Profile;
