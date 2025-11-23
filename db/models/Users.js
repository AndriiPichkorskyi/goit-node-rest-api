import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { emailRegExp, subscriptionEnum } from "../constants/authConstants.js";

const User = sequelize.define(
  "user",
  {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already exist",
      },
      validate: {
        is: emailRegExp,
      },
    },
    subscription: {
      type: DataTypes.ENUM,
      values: subscriptionEnum,
      defaultValue: "starter",
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(
          user.password,
          await bcrypt.genSalt(10)
        );
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(
            user.password,
            await bcrypt.genSalt(10)
          );
        }
      },
    },
  }
);

// User.sync({ alter: true });

export default User;
