import fs from "node:fs/promises";
import { STORAGE_AVATARS } from "../constants/folders.js";
import usersServices from "../services/authServices.js";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";

export const registerUser = async (req, res) => {
  const newUser = await usersServices.signupUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

export const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  await usersServices.verifyUser(verificationToken);
  return res.status(200).json({ message: "Verification successful" });
};

export const resendVerifyController = async (req, res) => {
  await usersServices.resendVerifyUser(req.body);

  res.json({
    message: "Verification email sent",
  });
};

export const loginUser = async (req, res) => {
  const { token, user } = await usersServices.loginUser(req.body);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

export const logoutUser = async (req, res) => {
  await usersServices.logoutUser(req.user);
  res.status(204).end();
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
    avatarURL: req.user.avatarURL,
  });
};

export const updateSubscription = async (req, res) => {
  await usersServices.updateSubscription(req.user, req.body.subscription);

  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

export const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Avatar file is required");
  }

  const { path: temporaryName, filename } = req.file;
  const fullFilePath = path.join(STORAGE_AVATARS, filename);

  try {
    await fs.rename(temporaryName, fullFilePath);
  } catch (error) {
    await fs.unlink(temporaryName);
    throw HttpError(500, error);
  }

  const newFilePath = fullFilePath.split("public")[1];

  await usersServices.updateAvatar(req.user, newFilePath);

  res.status(200).json({ avatarURL: newFilePath });
};
