import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { server } from "../config";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || "";
  jwt.verify(token.replace("Bearer ", ""), server.secret, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized");
    req.user = decoded;
    next();
  });
};
