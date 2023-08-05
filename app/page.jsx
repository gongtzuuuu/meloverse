"use client";

import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { GlobalPostContext } from "@components/GlobalPostProvider";
import PostFeed from "@components/PostFeed";

const Home = () => {
  const { data: session } = useSession();
  const [currentGreetings, setCurrentGreetings] = useState("");

  // Get posts
  const { globalAllPosts, setGlobalAllPosts, globalMyPosts, setGlobalMyPosts } =
    useContext(GlobalPostContext);
  const [allPost, setAllPosts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Change greetings on homepage
  const greetings = () => {
    const currentTime = new Date().getHours();
    if (currentTime > 3 && currentTime <= 12) {
      setCurrentGreetings("Good Morning");
    } else if (currentTime > 12 && currentTime <= 17) {
      setCurrentGreetings("Good Afternoon");
    } else if (currentTime > 17 && currentTime <= 20) {
      setCurrentGreetings("Good Evening");
    } else {
      setCurrentGreetings("How is your day?");
    }
  };

  // Handle delete method used on profile page
  // const handleDelete = async (post) => {
  //   // This confirm prompt is built into the browser API
  //   const hasConfirmed = confirm("Are you sure you want to delete this post?");

  //   if (hasConfirmed) {
  //     try {
  //       await fetch(`/api/post/${post._id.toString()}`, {
  //         method: "DELETE",
  //       });
  //       const filteredAllPosts
  //       setGlobalAllPosts()
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsDeleting(false);
  //     }
  //   }
  // };

  useEffect(() => {
    greetings();
  }, []);

  useEffect(() => {
    setAllPosts(globalAllPosts);
  }, [globalAllPosts]);

  useEffect(() => {
    isDeleting && setAllPosts(globalAllPosts);
  }, [isDeleting]);

  return (
    <section className="w-full flex-center flex-col">
      {/* Check if user is loggin in */}
      {session?.user ? (
        <div>
          <h1 className="head_text">
            {currentGreetings} <br className="max-md:hidden" />
            <span className="orange_gradient">{session.user.name}</span>
          </h1>
          <p className="desc">
            Good to see you again! Let the melodic journey begins.
          </p>
        </div>
      ) : (
        <div>
          <h1 className="head_text">
            Let's explore <br className="max-md:hidden" />
            <span className="orange_gradient">your meloverse</span>
          </h1>
          <p className="desc">
            Express with Music! Compose captivating posts with your favorite
            Spotify songs. Join now and share your melodic journey!
          </p>
        </div>
      )}
      {allPost.length > 0 && (
        <PostFeed text={"Trending Posts"} postData={allPost} />
      )}
      <div className="h-32"></div>
    </section>
  );
};

export default Home;
