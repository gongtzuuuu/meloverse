"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Greetings = () => {
  const { data: session } = useSession();
  const [currentGreetings, setCurrentGreetings] = useState("");
  // Change greetings on homepage
  const greetings = () => {
    const currentTime = new Date().getHours();
    if (currentTime > 3 && currentTime <= 12) {
      setCurrentGreetings("Good Morning");
    } else if (currentTime > 12 && currentTime <= 18) {
      setCurrentGreetings("Good Afternoon");
    } else if (currentTime > 18 && currentTime <= 22) {
      setCurrentGreetings("Good Evening");
    } else {
      setCurrentGreetings("How is your day?");
    }
  };

  useEffect(() => {
    greetings();
  }, []);

  return (
    <>
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
    </>
  );
};

export default Greetings;
