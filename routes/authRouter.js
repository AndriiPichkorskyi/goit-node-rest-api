import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyController,
  resendVerifyController,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  registrationSchema,
  subscriptionSchema,
  emailSchema,
} from "../schemas/authSchemas.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(registrationSchema),
  registerUser
);
authRouter.get("/verify/:verificationToken", verifyController);
authRouter.post("/verify", validateBody(emailSchema), resendVerifyController);
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
  "/subscription",
  validateBody(subscriptionSchema),
  updateSubscription
);
authRouter.patch("/avatars", upload.single("avatar"), updateAvatar);
export default authRouter;
