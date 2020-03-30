import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { server } from "../config";
import { IUser } from "../interfaces";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || "";
  jwt.verify(
    token.replace("Bearer ", ""),
    server.secret,
    (err, decoded: IUser) => {
      if (err) return res.status(401).send("Unauthorized");
      if (!decoded.profile)
        return res.status(403).send("You do not have a profile.");
      req.user = decoded;
      next();
    }
  );
};
