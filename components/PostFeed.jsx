import PostCard from "./PostCard";

const PostCardList = ({ postData, handleDelete }) => {
  return (
    <div className="mt-5 prompt_layout">
      {postData.map((post) => (
        <PostCard key={post._id} postData={post} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

/* PostFeed: text + postcards */
const PostFeed = ({ postData, text, handleDelete }) => {
  if (postData && postData.length !== 0)
    return (
      <section className="feed">
        <h1 className="font-satoshi font-semibold text-lg green_gradient">
          {text}
        </h1>
        <PostCardList postData={postData} handleDelete={handleDelete} />
      </section>
    );
};

export default PostFeed;
