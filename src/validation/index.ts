import { IPostValidationErrors } from "./../interfaces";
import { postErrors } from "./errors";
import isEmpty from "../helpers/isEmpty";

export default ({ title, body }) => {
  let errors: IPostValidationErrors = {};
  if (isEmpty(title)) errors.titleEmpty = postErrors.titleEmpty;
  if (isEmpty(body)) errors.bodyEmpty = postErrors.bodyEmpty;
  return Object.keys(errors).length > 0 ? errors : false;
};
