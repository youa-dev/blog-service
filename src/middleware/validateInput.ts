import validator from "../validation";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const inputErrors = validator(req.body);
  inputErrors ? res.status(500).json(inputErrors) : next();
};
