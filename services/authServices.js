import User from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../helpers/generateToken.js";
import gravatar from "gravatar";
import { sendEmail } from "../helpers/sendEmail.js";
import { createVerifyEmail } from "../helpers/createVerifyEmail.js";

async function signupUser(payload) {
  const user = await User.findOne({
    where: {
      email: payload.email,
    },
  });
  if (user) throw HttpError(409, "Email in use");

  const avatarURL = gravatar.url(payload.email, {
    s: "200",
    r: "pg",
    protocol: "https",
  });

  Object.assign(payload, { avatarURL });

  try {
    const verificationToken = generateToken({ email: payload.email });
    const newUser = await User.create({ ...payload, verificationToken });

    await sendEmail(createVerifyEmail(payload.email, verificationToken));

    return newUser;
  } catch (error) {
    throw HttpError(400, error.message);
  }
}

const verifyUser = async (verificationToken) => {
  const { payload, error } = verifyToken(verificationToken);
  if (error) throw HttpError(401, error.message);

  const user = await findUser({ email: payload.email });
  if (user.verify) throw HttpError(401, "Verification has already been passed");

  await user.update({ verify: true, verificationToken: "" });
};

const resendVerifyUser = async ({ email }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email not found");
  if (user.verify) throw HttpError(401, "Verification has already been passed");

  await sendEmail(createVerifyEmail(email, user.verificationToken));
};

async function loginUser(payload) {
  const user = await User.findOne({
    where: {
      email: payload.email,
    },
  });
  if (!user) throw HttpError(401, "Email or password is wrong");
  if (!user.verify) throw HttpError(401, "Email not verified");

  const passwordCompare = await bcrypt.compare(payload.password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

  const jswPayload = {
    id: user.id,
  };

  const token = generateToken(jswPayload);

  await user.update({ token });

  return { token, user };
}

function findUser(query) {
  return User.findOne({
    where: query,
  });
}

async function logoutUser(user) {
  await user.update({ token: null });
  return true;
}

async function updateSubscription(user, subscription) {
  return user.update({ subscription });
}

async function updateAvatar(user, newFilePath) {
  return user.update({ avatarURL: newFilePath });
}

export default {
  signupUser,
  loginUser,
  verifyUser,
  resendVerifyUser,
  findUser,
  logoutUser,
  updateSubscription,
  updateAvatar,
};
