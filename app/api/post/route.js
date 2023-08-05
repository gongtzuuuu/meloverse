import Post from "@models/post.model";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const posts = await Post.find({})
      .sort({ createdAt: -1, updatedAt: -1 })
      .populate("userId");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
