import express from "express";
import validateInput from "./middleware/validateInput";
import authUser from "./middleware/authUser";
import findPost from "./middleware/findPost";
import postsController from "./controllers/Posts.controller";
import commentsController from "./controllers/Comments.controller";

class Router {
  public POST_ROUTES = express.Router();
  public COMMENT_ROUTES = express.Router();
  constructor() {
    this.setPostsEndpoints();
    this.setCommentEndpoints();
  }
  private setPostsEndpoints(): void {
    this.POST_ROUTES.post(
      "/create",
      authUser,
      validateInput,
      postsController.createPost
    );
    this.POST_ROUTES.get("/get/:handle", postsController.getPost);
    this.POST_ROUTES.put(
      "/:postID/edit",
      authUser,
      findPost,
      validateInput,
      postsController.editPost
    );
    this.POST_ROUTES.delete(
      "/:postID/delete",
      authUser,
      findPost,
      postsController.deletePost
    );
    this.POST_ROUTES.patch(
      "/:postID/like",
      authUser,
      findPost,
      postsController.likePost
    );
  }
  private setCommentEndpoints(): void {
    this.COMMENT_ROUTES.post(
      "/new/:postID",
      authUser,
      findPost,
      commentsController.createComment
    );
    this.COMMENT_ROUTES.put(
      "/edit/:commentID",
      authUser,
      commentsController.editComment
    );
    this.COMMENT_ROUTES.delete(
      "/delete/:commentID",
      authUser,
      commentsController.deleteComment
    );
  }
}

const { POST_ROUTES, COMMENT_ROUTES } = new Router();

export default { POST_ROUTES, COMMENT_ROUTES };
