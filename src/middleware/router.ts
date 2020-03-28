import { Application } from "express";
import router from "../Router";

export default (app: Application): void => {
  app.use("/api/posts", router);
};
