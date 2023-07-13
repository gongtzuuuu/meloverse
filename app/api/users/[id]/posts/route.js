import Post from "@models/post.model";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  console.log("params from fetching user's posts (get)", params);
  try {
    await connectToDB();
    const posts = await Post.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
