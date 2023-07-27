import PostCard from "./PostCard";

const PostCardList = ({ postData, handleTagClick }) => {
  return (
    <div className="mt-5 prompt_layout">
      {postData.map((post) => (
        <PostCard
          key={post._id}
          postData={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

/* PostFeed: text + postcards */
const PostFeed = ({ postData, text }) => {
  const handleTagClick = () => {
    console.log("handle tag clicked!");
  };

  return (
    <section className="feed">
      <h1>{text}</h1>
      {postData ? (
        <PostCardList postData={postData} handleTagClick={handleTagClick} />
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default PostFeed;
