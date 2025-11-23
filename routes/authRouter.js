import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  registrationSchema,
  subscriptionSchema,
} from "../schemas/authSchemas.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(registrationSchema),
  registerUser
);
authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(registrationSchema),
  loginUser
);
authRouter.use(authenticate);
authRouter.post("/logout", logoutUser);
authRouter.get("/current", getCurrentUser);
authRouter.patch(
  "subscription",
  validateBody(subscriptionSchema),
  updateSubscription
);
export default authRouter;
