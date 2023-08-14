import Image from "next/image";
/* -------------------------- */
/* --- UserInfo Component --- */
/* -------------------------- */
const UserInfo = ({ userInfo, postData }) => {
  if (userInfo)
    return (
      <div className="feed">
        <div className="flex flex-wrap justify-center items-end">
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
          Shared {postData ? postData.length : ""} melodic stories ♬
        </p>
      </div>
    );
};

export default UserInfo;
