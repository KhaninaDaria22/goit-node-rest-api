import HttpError from "./HttpError.js";
import jwt from "jsonwebtoken";
import User from "../db/user.js";

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  
  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Unauthorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Unauthorized"));
  }
};
