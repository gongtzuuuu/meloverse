import { cookies, headers } from "next/headers";
import { getServerSession as originalGetServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import UserInfo from "@components/UserInfo";
import PostFeed from "@components/PostFeed";
import SongFeed from "@components/SongFeed";

const getServerSession = async () => {
  try {
    const req = {
      headers: Object.fromEntries(headers()),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value])
      ),
    };
    const res = { getHeader() {}, setCookie() {}, setHeader() {} };
    const session = await originalGetServerSession(req, res, authOptions);
    return session;
  } catch (error) {
    console.log("error from getServerSession func. on Profile", error);
  }
};

/* ----------------------- */
/* --- Get Liked Songs --- */
/* ----------------------- */
const getLikedSong = async (session, userId) => {
  if (session?.user.id === userId) {
    try {
      const res = await fetch("https://api.spotify.com/v1/me/tracks", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (res.status === 200 && res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.log("error from getLikedSong func. on Profile", error);
    }
  }
};
/* ------------------------- */
/* --- Profile Component --- */
/* ------------------------- */
const Profile = async ({ userId, userInfo, postData }) => {
  const session = await getServerSession(authOptions);
  const likedSongs = await getLikedSong(session, userId);

  return (
    <section className="w-full">
      <UserInfo userInfo={userInfo} postData={postData} />
      <PostFeed postData={postData} />
      {session.user.id === userId && (
        <SongFeed text="Liked Songs" songs={likedSongs.items} />
      )}
    </section>
  );
};

export default Profile;
