import User from "@models/user.model";
import { connectToDB } from "@utils/database";

/* localhost:300/api/users/:id */

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user by ID", { status: 500 });
  }
};
