import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

export interface IRequest extends Request {
  user?: IUser;
}

export interface IComment {
  user: string;
  body: string;
}

export interface IPost extends Document {
  id?: string;
  author?: string;
  title?: string;
  handle?: string;
  body?: string;
  likes?: string[];
  comments?: IComment[];
  createdAt?: Date;
  views?: number;
}

export interface IPostValidationErrors {
  titleEmpty?: string;
  bodyEmpty?: string;
}

export interface IConnectionArguments {
  uris?: string;
  options?: object;
}
