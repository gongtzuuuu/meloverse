import Post from "@models/post.model";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, post, tag } = await request.json();

  try {
    //1. Check if it has connected to DB
    await connectToDB();

    //2. Create a new post
    const newPost = new Post({
      creator: userId,
      post,
      tag,
    });

    //3. Save it to the DB
    await newPost.save();

    //4. Return a response and a 201 status
    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
