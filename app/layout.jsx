import "@styles/globals.css";

import Provider from "@components/Provider";
import GlobalSongProvider from "@components/GlobalSongProvider";
import Nav from "@components/Nav";
import Player from "@components/Player";

/* Next auth doesn't just use the frontend files within the app for authentication */
/* It uses the next.js API backend endpoints as well */

export const metadata = {
  title: "MeloVerse",
  description: "",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            <GlobalSongProvider>
              {children}
              <Player />
            </GlobalSongProvider>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
