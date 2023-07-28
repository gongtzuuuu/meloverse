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

  if (postData && postData.length !== 0)
    return (
      <section className="feed">
        <h1 className="font-satoshi font-semibold text-lg green_gradient">
          {text}
        </h1>
        <PostCardList postData={postData} handleTagClick={handleTagClick} />
      </section>
    );
};

export default PostFeed;
