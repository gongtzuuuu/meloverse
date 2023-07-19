import Post from "@models/post.model";
import { connectToDB } from "@utils/database";

/* localhost:300/api/users/:id/posts */

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const posts = await Post.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
