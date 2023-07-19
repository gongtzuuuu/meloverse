import { Schema, model, models } from "mongoose";

const subSchema = new Schema({
  spotify_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
  likedSong: {
    type: [subSchema],
    default: [],
  },
  playedSong: {
    type: [subSchema],
    default: [],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
