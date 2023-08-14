import { cookies, headers } from "next/headers";
import { getServerSession as originalGetServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
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
  console.log("session from getSongInfo", session);
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

/* ------------------------- */
/* --- Get Post's Detail --- */
/* ------------------------- */
const getPostDetail = async (postId) => {
  const res = await fetch(process.env.BASE_URL + `/api/post/${postId}`);
  return res.json();
};

/* ------------------------- */
/* --- Post Details Page --- */
/* ------------------------- */
const PostDetails = async (context) => {
  const session = await getServerSession(authOptions);
  const postId = context.params.id;
  const postDetail = await getPostDetail(postId);
  const songId = postDetail.songId;
  const songInfo = await getSongInfo(songId, session);

  return (
    <section className="feed">
      <SongForm
        songId={songId}
        songInfo={songInfo}
        postId={postId}
        postDetail={postDetail}
        submitStatus={"Update"}
      />
      <div className="h-32"></div>
    </section>
  );
};

export default PostDetails;
