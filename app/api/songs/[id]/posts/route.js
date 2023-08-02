import Post from "@models/post.model";
import { connectToDB } from "@utils/database";

export const GET = async ({ params }, request, response) => {
  try {
    await connectToDB();
    const posts = await Post.find({ songId: params.id }).populate("userId");
    console.log("Type of the posts from a song", typeof posts);
    return response.status(200).json(posts);
    // return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch posts of the song", { status: 500 });
  }
};
