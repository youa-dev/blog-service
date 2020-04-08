import express from "express";
import validateInput from "./middleware/validateInput";
import authUser from "./middleware/authUser";
import findPost from "./middleware/findPost";
import controller from "./controllers/Post.controller";

class Router {
  public POST_ROUTES = express.Router();
  public COMMENT_ROUTES = express.Router();
  constructor() {
    this.setEndpoints();
  }
  private setEndpoints(): void {
    this.POST_ROUTES.post(
      "/create",
      authUser,
      validateInput,
      controller.createPost
    );
    this.POST_ROUTES.get("/get/:handle", controller.getPost);
    this.POST_ROUTES.put(
      "/:postID/edit",
      authUser,
      findPost,
      validateInput,
      controller.editPost
    );
    this.POST_ROUTES.delete(
      "/:postID/delete",
      authUser,
      findPost,
      controller.deletePost
    );
    this.POST_ROUTES.patch(
      "/:postID/like",
      authUser,
      findPost,
      controller.likePost
    );
    this.COMMENT_ROUTES.post(
      "/comment/new/:postID",
      authUser,
      findPost,
      controller.commentPost
    );
    this.COMMENT_ROUTES.put(
      "/comment/edit/:commentID",
      authUser,
      controller.editComment
    );
    this.COMMENT_ROUTES.delete(
      "/comment/delete/:commentID",
      authUser,
      controller.deleteComment
    );
  }
}

const { POST_ROUTES, COMMENT_ROUTES } = new Router();

export default { POST_ROUTES, COMMENT_ROUTES };
