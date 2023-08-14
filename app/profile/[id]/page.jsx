import Profile from "@components/Profile";

// ***************
// Get User's Info
// ***************
const getUserInfo = async (userId) => {
  const res = await fetch(process.env.BASE_URL + `/api/users/${userId}`, {
    cache: "no-store",
  });
  return res.json();
};

// ****************
// Get User's Posts
// ****************
const getUserPost = async (userId) => {
  const res = await fetch(process.env.BASE_URL + `/api/users/${userId}/posts`, {
    cache: "no-store",
  });
  return res.json();
};

// ************
// Profile Page
// ************
const UserProfile = async (context) => {
  const userId = context.params.id;
  const userInfo = await getUserInfo(userId);
  const userPosts = await getUserPost(userId);

  return (
    <section className="w-full flex-center flex-col">
      <Profile userId={userId} userInfo={userInfo} postData={userPosts} />
      <div className="h-32"></div>
    </section>
  );
};

export default UserProfile;
