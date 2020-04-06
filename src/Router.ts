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
    this.ROUTER.delete("/delete", authUser, findPost, controller.deletePost);
    this.ROUTER.patch("/like", authUser, findPost, controller.likePost);
    this.ROUTER.post(
      "/comment/new",
      authUser,
      findPost,
      controller.commentPost
    );
  }
}

export default new Router().ROUTER;
