import { Schema, model, models } from "mongoose";

const SongSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  spotify_id: {
    type: String,
    required,
  },
  name: {
    type: String,
    required,
  },
  artist: {
    type: String,
    required,
  },
  image_url: {
    type: String,
    required,
  },
  liked: {
    type: Boolean,
    default: false,
  },
});

const Song = models.Song || model("Song", SongSchema);

export default Song;
