import "@styles/globals.css";

import AuthProvider from "@context/AuthProvider";
import GlobalSongProvider from "@context/GlobalSongProvider";
import GlobalPostProvider from "@context/GlobalPostProvider";
import Nav from "@components/Nav";
import Player from "@components/Player";

/* Next auth doesn't just use the frontend files within the app for authentication */
/* It uses the next.js API backend endpoints as well */

export const metadata = {
  title: "meloverse",
  description:
    "Welcome to Meloverse - the app where users write posts with their favorite songs. Connect your Spotify account and dive into a melodic journey today!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <AuthProvider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            <GlobalSongProvider>
              <GlobalPostProvider>{children}</GlobalPostProvider>
              <Player />
            </GlobalSongProvider>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
