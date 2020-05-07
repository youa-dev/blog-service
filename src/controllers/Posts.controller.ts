import { IRequest, IPost } from "../interfaces";
import { Request, Response } from "express";
import Post from "../db/models/Post.model";
import crypto from "crypto";

const generateHandle = (title: string) =>
  `${title.toLowerCase().split(" ").join("-")}-${crypto
    .randomBytes(4)
    .toString("hex")}`;

class PostController {
  public async createPost(req: IRequest, res: Response) {
    const newPost = await Post.create({
      author: req.user.id,
      title: req.body.title,
      handle: generateHandle(req.body.title),
      body: req.body.body,
    });
    return res.status(200).json(newPost);
  }
  public async getPost(req: Request, res: Response) {
    const post: IPost = await Post.findOne({
      handle: req.params.handle,
    }).populate("comments");
    if (!post) return res.status(404).json({ error: "Post not found." });
    post.views++;
    post.save().then((updated) => res.status(200).json(updated));
  }
  public async editPost(req: IRequest, res: Response) {
    if (req.user.id != req.post.author)
      return res
        .status(403)
        .json({ error: "You are no the author of this post." });
    req.post.title = req.body.title;
    req.post.handle = generateHandle(req.body.title);
    req.post.body = req.body.body;
    req.post.save().then((updated) => res.status(200).json(updated));
  }
  public async deletePost(req: IRequest, res: Response) {
    if (req.user.id != req.post.author)
      return res
        .status(403)
        .json({ error: "You are no the author of this post." });
    await req.post.remove();
    return res.status(200).json({ deleted: true, timestamp: Date.now() });
  }
  public likePost(req: IRequest, res: Response) {
    if (req.user.id == req.post.author)
      return res.status(403).json({ error: "You cannot like your own post." });
    // Iterate over likes, then handle the request
    req.post.likes = req.post.likes.includes(req.user.id)
      ? req.post.likes.filter((l) => l != req.user.id)
      : [...req.post.likes, req.user.id];
    req.post.save().then((updated) => res.status(200).json(updated));
  }
  public async getAllPosts(req: IRequest, res: Response) {
    const posts = await Post.find({ author: req.params.userID });
    return res.status(200).json(posts);
  }
}

export default new PostController();
