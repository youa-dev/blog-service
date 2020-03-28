import { Schema } from "mongoose";
import generator from "./model.generator";

const schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: String,
    required: true
  },
  likes: [{ type: Schema.Types.ObjectId }],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        required: true
      },
      body: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  }
});

export default generator("post", schema);
