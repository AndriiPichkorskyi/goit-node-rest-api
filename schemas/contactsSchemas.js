import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
  }),
}).messages({
  "any.required": "The {{#label}} field is required.",
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email().messages({
    "string.email": "Please enter a valid email address.",
  }),
})
  .min(1)
  .message("Body must have at least one field");
