import { v4 as uuidv4 } from "uuid";
import PostCard from "./PostCard";

const PostCardList = ({ postData, handleDelete }) => {
  if (postData)
    return (
      <div className="mt-5 prompt_layout">
        {postData.map((post) => (
          <PostCard
            key={post._id}
            postData={post}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    );
};

/* PostFeed: text + postcards */
const PostFeed = ({ text, postData, handleDelete }) => {
  if (postData && postData.length !== 0)
    return (
      <section className="feed">
        <h1 className="font-satoshi font-semibold text-lg orange_gradient">
          {text}
        </h1>
        <PostCardList
          key={uuidv4()}
          postData={postData}
          handleDelete={handleDelete}
        />
      </section>
    );
};

export default PostFeed;
