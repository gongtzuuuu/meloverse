import Post from "@models/post.model";
import { connectToDB } from "@utils/database";

// 1. GET (read)
export const GET = async (request, { params }) => {
  console.log("params from single post api (get)", params);

  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate("creator");

    // If the post doesn't exist
    if (!post) return new Response("Post not found", { status: 404 });

    // If the post exists
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to read the post", { status: 500 });
  }
};

// 2. PATCH (update)
export const PATCH = async (request, { params }) => {
  console.log("request from single post api (patch)", request);
  console.log("params from single post api (patch)", params);
  const { post, tag } = await request.json();

  try {
    await connectToDB();
    const existingPost = await Post.findById(params.id);

    // If the post doesn't exist
    if (!existingPost) return new Response("Post not found", { status: 404 });

    // If the post exists
    existingPost.post = post; // The new post comes from request
    existingPost.tag = tag; // The new tag comes from request

    await existingPost.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the post", { status: 500 });
  }
};

// 3. DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Post.findOneAndRemove(params.id);
    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the post", { status: 500 });
  }
};
