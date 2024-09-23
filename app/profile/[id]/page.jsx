import Profile from '@components/Profile';

// ***************
// Get User's Info
// ***************
const getUserInfo = async (userId) => {
  try {
    const res = await fetch(process.env.BASE_URL + `/api/users/${userId}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res.json();
  } catch (error) {
    console.log('Error from getUserInfo func. on profile page', error);
  }
};

// ****************
// Get User's Posts
// ****************
const getUserPost = async (userId) => {
  try {
    const res = await fetch(
      process.env.BASE_URL + `/api/users/${userId}/posts`,
      {
        cache: 'no-store',
      }
    );
    const data = await res.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.log('Error from getUserPost func. on profile page', error);
  }
};

// ************
// Profile Page
// ************
const UserProfile = async (props) => {
  const userId = props.params.id;
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
