import { Schema } from "mongoose";
import generator from "./model.generator";

const schema = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId }],
  views: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default generator("post", schema);
