import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  const generateRandomString = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const randomState = generateRandomString(16);

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
    response_type: "code",
    redirect_uri: `http://localhost:3000/api/auth/callback/spotify`,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    state: randomState,
  };

  const LOGIN_URL =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams(params).toString();

  if (pathname.includes("/api/auth") || token) return NextResponse.next();
  if (!token) return NextResponse.redirect(LOGIN_URL, req.url);
  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/profile/:path*",
    "/details/:path*",
    "/post/:path*",
    "/search/:path*",
  ],
};
