import { IRequest, IComment } from "../interfaces";
import { Response } from "express";
import Comment from "../db/models/Comment.model";
import isEmpty from "../helpers/isEmpty";

class PostController {
  public async createComment(req: IRequest, res: Response) {
    // Basic input validation
    if (isEmpty(req.body.body))
      return res.status(400).json({ error: "A comment should not be empty." });
    const comment = await Comment.create({
      user: req.user.id,
      body: req.body.body,
    });
    req.post.comments.push(comment.id);
    req.post.save().then((post) => res.status(200).json(post));
  }
  public async editComment(req: IRequest, res: Response) {
    // Find comment
    const comment: IComment = await Comment.findById(req.params.commentID);
    if (!comment) return res.status(404).json({ error: "Comment not found." });
    if (req.user.id != comment.user)
      return res
        .status(403)
        .json({ error: "You are no the author of this comment." });
    // Basic input validation
    if (isEmpty(req.body.body))
      return res.status(400).json({ error: "A comment should not be empty." });
    comment.body = req.body.body;
    const updated = await comment.save();
    return res.status(200).json(updated);
  }
  public async deleteComment(req: IRequest, res: Response) {
    const comment: IComment = await Comment.findById(req.params.commentID);
    if (req.user.id != comment.user)
      return res
        .status(403)
        .json({ error: "You are no the author of this comment." });
    await comment.remove();
    return res.status(200).json({ deleted: true, timestamp: Date.now() });
  }
}

export default new PostController();
