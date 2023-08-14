import Greetings from "@components/Greetings";
import PostFeed from "@components/PostFeed";

/* --------------------- */
/* --- Get All Posts --- */
/* --------------------- */
const getPosts = async () => {
  try {
    // Fetch initial data
    const res = await fetch(process.env.BASE_URL + "/api/post", {
      cache: "no-store",
    });
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error("Error from getting posts on homepage", error);
  }
};

/* ----------------- */
/* --- Home Page --- */
/* ----------------- */
const Home = async () => {
  const allPosts = await getPosts();

  return (
    <section className="w-full flex-center flex-col">
      <Greetings />
      {allPosts && <PostFeed text={"Trending Posts"} postData={allPosts} />}
      <div className="h-32"></div>
    </section>
  );
};

export default Home;
