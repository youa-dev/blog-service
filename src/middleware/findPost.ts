import { Response, NextFunction } from "express";
import { IRequest, IPost } from "../interfaces";
import Post from "../db/models/Post.model";

export default async (req: IRequest, res: Response, next: NextFunction) => {
  const post: IPost = await Post.findById(req.body.postID);
  if (!post) return res.status(404).json({ error: "Post not found." });
  req.post = post;
  next();
};
