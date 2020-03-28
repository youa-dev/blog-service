import { IRequest } from "../interfaces";
import { Response } from "express";
import Post from "../db/models/Post.model";
import crypto from "crypto";

const generateHandle = (title: string) =>
  `${title
    .toLowerCase()
    .split(" ")
    .join("-")}-${crypto.randomBytes(4).toString("hex")}`;

class PostController {
  public async createPost(req: IRequest, res: Response) {
    const newPost = await Post.create({
      author: req.user.id,
      title: req.body.title,
      handle: generateHandle(req.body.title),
      body: req.body.body
    });
    return res.status(200).json(newPost);
  }
}

export default new PostController();
