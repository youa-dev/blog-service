import { Schema } from "mongoose";
import generator from "./model.generator";

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

export default generator("comment", schema);
