import { cookies, headers } from "next/headers";
import { getServerSession as originalGetServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import PostFeed from "@components/PostFeed";
import SongForm from "@components/SongForm";

const getServerSession = async () => {
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
};

/* ----------------------- */
/* --- Get Song's Info --- */
/* ----------------------- */
const getSongInfo = async (songId, session) => {
  if (session && session.accessToken) {
    const res = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    if (res.ok && res.status === 200) {
      return res.json();
    }
  }
};
/* ------------------------ */
/* --- Get Song's Posts --- */
/* ------------------------ */
const getAllSongPost = async (songId) => {
  const res = await fetch(process.env.BASE_URL + `/api/songs/${songId}/posts`, {
    cache: "no-store",
  });
  if (res.ok && res.status === 200) {
    const data = await res.json();
    return data;
  }
};
/* ----------------------- */
/* --- Filter My Posts --- */
/* ----------------------- */
const getMySongPost = async (allSongPosts, session) => {
  if (allSongPosts) {
    return allSongPosts.filter((post) => post.userId._id === session?.user.id);
  }
};
/* -------------------------- */
/* --- Filter Other Posts --- */
/* -------------------------- */
const getOtherSongPost = (allSongPosts, session) => {
  if (allSongPosts) {
    return allSongPosts.filter((post) => post.userId._id !== session?.user.id);
  }
};
/* -------------------------- */
/* --- Song's Detail Page --- */
/* -------------------------- */
const Details = async (context) => {
  const session = await getServerSession(authOptions);
  const songId = context.params.id;
  const songInfo = await getSongInfo(songId, session);
  const allSongPosts = await getAllSongPost(songId);
  const mySongPosts = await getMySongPost(allSongPosts, session);
  const otherSongPosts = await getOtherSongPost(allSongPosts, session);

  return (
    <section className="w-full flex-center flex-col">
      <SongForm songId={songId} songInfo={songInfo} submitStatus={"Create"} />
      <PostFeed postData={mySongPosts} text={"Your Posts"} />
      <PostFeed postData={otherSongPosts} text={"Stories from Others"} />
      <div className="h-32"></div>
    </section>
  );
};

export default Details;
