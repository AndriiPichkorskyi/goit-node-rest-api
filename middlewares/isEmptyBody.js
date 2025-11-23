import HttpError from "../helpers/HttpError.js";

export default function isEmptyBody(req, res, next) {
  if (Object.values(req.body).length === 0)
    return next(HttpError(400, "Body must have at least one field"));
  next();
}
