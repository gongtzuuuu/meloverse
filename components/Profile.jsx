import PostFeed from "@components/PostFeed";
import SongFeed from "@components/SongFeed";

const Profile = ({ name, desc, postData, text, handleDelete }) => {
  return (
    <section className="w-full">
      {/* Title and description */}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      {/* Feeds */}
      <PostFeed postData={postData} text={text} handleDelete={handleDelete} />
      <SongFeed text="Liked songs..." />
    </section>
  );
};

export default Profile;
