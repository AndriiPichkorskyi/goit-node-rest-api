import User from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/generateToken.js";

async function singupUser(payload) {
  const user = await User.findOne({
    where: {
      email: payload.email,
    },
  });
  if (user) throw HttpError(409, "Email in use");

  try {
    return User.create(payload);
  } catch (error) {
    throw HttpError(400, error.message);
  }
}

async function loginUser(payload) {
  const user = await User.findOne({
    where: {
      email: payload.email,
    },
  });
  if (!user) throw HttpError(401, "Email or password is wrong");

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
  await user.update({ subscription });
}

export default {
  singupUser,
  loginUser,
  findUser,
  logoutUser,
  updateSubscription,
};
