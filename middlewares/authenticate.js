import { verifyToken } from "../helpers/generateToken.js";
import HttpError from "../helpers/HttpError.js";
import usersServices from "../services/authServices.js";

export default async function authenticate(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) throw HttpError(401, "Authorization header missing");

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") throw HttpError(401, "Bearer missing");

  const { payload, error } = verifyToken(token);

  if (error) throw HttpError(401, "Not authorized");
  const user = await usersServices.findUser({ id: payload.id });

  if (!user || !user.token) {
    return next(HttpError(401, "Not authorized"));
  }
  req.user = user;
  next();
}
