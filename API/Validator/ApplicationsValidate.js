import Joi from "joi";

export const CreateApplicationSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  mail: Joi.string().trim().email().required(),
  cover_letter: Joi.string().trim().min(40).required(),
  advertisement_id: Joi.number().integer().required(),
});

export const UpdateApplicationStatusSchema = Joi.object({
  application_status: Joi.string().valid("pending", "accepted", "rejected").required(),
});
