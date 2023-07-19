import User from "@models/user.model";
import { connectToDB } from "@utils/database";

/* localhost:300/api/users/:userId/songs-liked */
/* The rote is used to get songs that the user has liked */

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const songs = await User.findById(params.id).select("likedSong");
    return new Response(JSON.stringify(songs), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};

// PATCH (create)
export const POST = async (request, { params }) => {
  console.log("request.body", request.json());
  // const { newSong } = await request.json();

  // try {
  //   await connectToDB();
  //   const songs = await User.findById(params.id).select("likedSong");

  //   // If the song doesn't exist, update the list with new song
  //   if (!songs.include(newSong.id)) songs.push(newSong.id);
  //   await songs.save();

  //   return new Response(JSON.stringify(songs), { status: 200 });
  // } catch (error) {
  //   return new Response("Failed to update the post", { status: 500 });
};
