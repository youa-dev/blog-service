import { Schema } from "mongoose";
import generator from "./model.generator";

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

export default generator("comment", schema);
