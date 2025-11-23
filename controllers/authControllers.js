import usersServices from "../services/authServices.js";

export const registerUser = async (req, res) => {
  const newUser = await usersServices.singupUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export const loginUser = async (req, res) => {
  const { token, user } = await usersServices.loginUser(req.body);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
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
  });
};

export const updateSubscription = async (req, res) => {
  const subscription = await usersServices.updateSubscription(
    user,
    req.body.subscription
  );
};
