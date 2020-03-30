import express from "express";
import validateInput from "./middleware/validateInput";
import authUser from "./middleware/authUser";
import controller from "./controllers/Post.controller";
import { IRequest } from "./interfaces";

class Router {
  public ROUTER = express.Router();
  constructor() {
    this.setEndpoints();
  }
  private setEndpoints(): void {
    this.ROUTER.post("/create", authUser, validateInput, controller.createPost);
    this.ROUTER.get("/get/:handle", controller.getPost);
    this.ROUTER.put("/edit", authUser, validateInput, controller.editPost);
    this.ROUTER.delete("/delete", authUser, controller.deletePost);
  }
}

export default new Router().ROUTER;
