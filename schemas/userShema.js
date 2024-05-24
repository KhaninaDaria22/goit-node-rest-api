import Joi from "joi";

export const registerUsertSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "Missing required name field" }),

  email: Joi.string()
   .email()
    .required()
    .messages({ "any.required": "Missing required email field" }),
    
    subscription: Joi.string()
    .valid("starter", "pro", "business")
    .messages({ "any.required": "Missing required phone field" }),
});

export const loginSchema = Joi.object({
    password: Joi.string().min(6).required().messages({
      "any.required": "Enter password",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Enter email",
    }),
    subscription: Joi.string().valid("starter", "pro", "business").messages({
      "any.only": "Subscription has only 3 values: starter, pro, business",
    }),
  });
  

