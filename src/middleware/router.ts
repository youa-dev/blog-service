import { Application } from "express";
import routers from "../Router";

export default (app: Application): void => {
  app.use("/api/posts", routers.POST_ROUTES);
  app.use("/api/comments", routers.COMMENT_ROUTES);
};
