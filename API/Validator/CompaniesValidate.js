import Joi from "joi";

const passwordRules = Joi.string()
  .min(8)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).+$"))
  .messages({
    "string.pattern.base":
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
    "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
    "any.required": "Le mot de passe est requis.",
  });

export const CreateCompanySchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  siret: Joi.string().trim().min(3).required(),
  mail: Joi.string().trim().email().required(),
  business_sector: Joi.string().trim().min(3).required(),
  headquarters: Joi.string().trim().min(3).required(),
  web_site: Joi.string().trim().min(3).required(),
  description: Joi.string().allow("").optional(),
  password: passwordRules.required(),
});

export const UpdateCompanySchema = Joi.object({
  name: Joi.string().trim().min(3).optional(),
  siret: Joi.string().trim().min(3).optional(),
  mail: Joi.string().trim().email().optional(),
  business_sector: Joi.string().trim().min(3).optional(),
  headquarters: Joi.string().trim().min(3).optional(),
  web_site: Joi.string().trim().min(3).optional(),
  description: Joi.string().allow("").optional(),
  password: passwordRules.optional(),
}).min(1);
