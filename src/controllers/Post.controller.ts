import { IRequest, IPost } from "../interfaces";
import { Request, Response } from "express";
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
  public async getPost(req: Request, res: Response) {
    const post: IPost = await Post.findOne({ handle: req.params.handle });
    if (!post) return res.status(404).json({ error: "Post not found." });
    post.views++;
    await post.save().then(updated => res.status(200).json(updated));
  }
  public async editPost(req: IRequest, res: Response) {
    const post: IPost = await Post.findOne({
      author: req.user.id,
      _id: req.body.postID
    });
    if (!post) return res.status(404).json({ error: "Post not found." });
    post.title = req.body.title;
    post.handle = generateHandle(req.body.title);
    post.body = req.body.body;
    await post.save().then(updated => res.status(200).json(updated));
  }
  public async deletePost(req: IRequest, res: Response) {
    const post: IPost = await Post.findOne({
      author: req.user.id,
      _id: req.body.postID
    });
    if (!post) return res.status(404).json({ error: "Post not found." });
    await post.remove();
    return res.status(200).json({ deleted: true, timestamp: Date.now() });
  }
}

export default new PostController();
