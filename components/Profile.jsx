import Image from "next/image";
import PostFeed from "@components/PostFeed";

const Profile = ({ userInfo, postData, handleDelete }) => {
  if (userInfo)
    return (
      <section className="w-full">
        {/* Title and description */}
        <div className="feed">
          <div className="flex items-end">
            <div>
              <Image
                src={userInfo.image}
                alt="user image"
                width={60}
                height={60}
                className="rounded-full mr-2"
              />
            </div>
            <h1 className="head_text text-left">
              <span className="blue_gradient">{userInfo.username}</span>
            </h1>
          </div>

          <p className="desc text-left">
            Shared {postData.length} melodic stories ♬
          </p>
        </div>
        {/* Feeds */}
        <PostFeed postData={postData} handleDelete={handleDelete} />
      </section>
    );
};

export default Profile;
