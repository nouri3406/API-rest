import Joi from "joi";

const passwordRules = Joi.string()
  .min(8)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).+$"))
  .messages({
    "string.pattern.base":
      "The password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
    "string.min": "The password must contain at least 8 characters.",
    "any.required": "Le mot de passe est requis.",
  });

export const CreatePeopleSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  first_name: Joi.string().trim().min(3).required(),
  phone_number: Joi.string().pattern(/^\d{10}$/).required(),
  mail: Joi.string().trim().email().required(),
  adress: Joi.string().trim().min(3).required(),
  city: Joi.string().trim().min(3).required(),
  password: passwordRules.required(),
});

export const UpdatePeopleSchema = Joi.object({
  name: Joi.string().trim().min(3).optional(),
  first_name: Joi.string().trim().min(3).optional(),
  phone_number: Joi.string().pattern(/^\d{10}$/).optional(),
  mail: Joi.string().trim().email().optional(),
  adress: Joi.string().trim().min(3).optional(),
  city: Joi.string().trim().min(3).optional(),
  password: passwordRules.optional(),
}).min(1);
