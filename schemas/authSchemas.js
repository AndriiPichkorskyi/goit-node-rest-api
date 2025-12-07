import Joi from "joi";
import { emailRegExp, subscriptionEnum } from "../constants/authConstants.js";

export const registrationSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.email": "Please enter a valid email address.",
  }),
  password: Joi.string().required(),
}).messages({
  "any.required": "The {{#label}} field is required.",
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionEnum)
    .required(),
}).messages({
  "any.required":
    "The {{#label}} field is required. Valid values are 'starter', 'pro' or 'business'",
});

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    "string.email": "Please enter a valid email address.",
  }),
});
