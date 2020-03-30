import sanitize from "sanitize-html";
import { Request, NextFunction } from "express";

export default (req: Request, _, next: NextFunction) => {
  req.body.title = sanitize(req.body.title);
  req.body.body = sanitize(req.body.body);
  next();
};
