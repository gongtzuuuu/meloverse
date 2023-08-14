/* It's an API route with an API auth Dynamic next auth */
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

import User from "@models/user.model";
import { connectToDB } from "@utils/database";

const params = {
  scope: [
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-modify-playback-state",
    "streaming",
  ].join(","),
};

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

const refreshAccessToken = async (token) => {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", token.refreshToken);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_SECRET
        ).toString("base64"),
    },
    body: params,
  });
  if (response) {
    const data = await response.json();
    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  }
};

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        return token;
      } else if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires * 1000
      ) {
        // access token has not expired
        return token;
      } else {
        // access token has expired
        const refreshToken = await refreshAccessToken(token);
        return refreshToken;
      }
    },
    async session({ session, token, user }) {
      // Store the user id from MongoDB to session
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      // Make sure which user is currently online
      session.user.id = sessionUser._id.toString();
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // 1. Check if a user is already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        //2. If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.display_name,
            image: profile.images[0].url,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
