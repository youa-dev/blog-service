import express from "express";
import validateInput from "./middleware/validateInput";
import authUser from "./middleware/authUser";
import findPost from "./middleware/findPost";
import controller from "./controllers/Post.controller";

class Router {
  public ROUTER = express.Router();
  constructor() {
    this.setEndpoints();
  }
  private setEndpoints(): void {
    this.ROUTER.post("/create", authUser, validateInput, controller.createPost);
    this.ROUTER.get("/get/:handle", controller.getPost);
    this.ROUTER.put(
      "/edit",
      authUser,
      findPost,
      validateInput,
      controller.editPost
    );
    this.ROUTER.delete(
      "/:postID/delete",
      authUser,
      findPost,
      controller.deletePost
    );
    this.ROUTER.patch("/:postID/like", authUser, findPost, controller.likePost);
    this.ROUTER.post(
      "/:postID/comment/new",
      authUser,
      findPost,
      controller.commentPost
    );
    this.ROUTER.delete(
      "/:postID/comment/edit/:commentID",
      authUser,
      findPost,
      controller.editComment
    );
    this.ROUTER.patch(
      "/:postID/comment/delete/:commentID",
      authUser,
      authUser,
      findPost,
      controller.deleteComment
    );
  }
}

export default new Router().ROUTER;
