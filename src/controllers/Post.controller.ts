import { IRequest, IPost } from "../interfaces";
import { Request, Response } from "express";
import Post from "../db/models/Post.model";
import Comment from "../db/models/Comment.model";
import crypto from "crypto";
import isEmpty from "../helpers/isEmpty";

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
    const post: IPost = await Post.findOne({
      handle: req.params.handle
    }).populate("comments");
    if (!post) return res.status(404).json({ error: "Post not found." });
    post.views++;
    post.save().then(updated => res.status(200).json(updated));
  }
  public async editPost(req: IRequest, res: Response) {
    if (req.post.author !== req.user.id)
      return res
        .status(403)
        .json({ error: "You are no the author of this post." });
    req.post.title = req.body.title;
    req.post.handle = generateHandle(req.body.title);
    req.post.body = req.body.body;
    req.post.save().then(updated => res.status(200).json(updated));
  }
  public async deletePost(req: IRequest, res: Response) {
    if (req.post.author !== req.user.id)
      return res
        .status(403)
        .json({ error: "You are no the author of this post." });
    await req.post.remove();
    return res.status(200).json({ deleted: true, timestamp: Date.now() });
  }
  /**
   * TODO
   * Add methods for:
   * - Editing comments
   * - Deleting comments
   */
  public async commentPost(req: IRequest, res: Response) {
    // Basic input validation
    if (isEmpty(req.body.body))
      return res.status(400).json({ error: "A comment should not be empty." });
    const comment = await Comment.create({
      user: req.user.id,
      body: req.body.body
    });
    req.post.comments.push(comment.id);
    req.post.save().then(post => res.status(200).json(post));
  }
  public async likePost(req: IRequest, res: Response) {
    // Iterate over likes, then handle the request
    const { likes } = req.post;
    req.post.likes = likes.includes(req.user.id)
      ? likes.filter(v => v !== req.user.id)
      : [...likes, req.user.id];
    req.post.save().then(updated => res.status(200).json(updated));
  }
}

export default new PostController();
