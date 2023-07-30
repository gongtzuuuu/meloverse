import Post from "@models/post.model";
import { connectToDB } from "@utils/database";

/* localhost:300/api/post/hashtag/:hashtag */

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const post = await Post.find({ tag: `${params.hashtag}` }).populate(
      "userId"
    );

    // If the post doesn't exist
    if (!post) return new Response("Post not found", { status: 404 });

    // If the post exists
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to read the post", { status: 500 });
  }
};
