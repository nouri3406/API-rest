import Joi from "joi";

export const ApplicationsSchema = Joi.object({
    name: Joi.string().trim().min(2).required(),
    mail: Joi.string().trim().email().required(),
    cover_letter: Joi.string().min(40).required(),
    advertisement_id: Joi.number().integer().required(),
    application_status: Joi.string().valid('pending', 'accepted', 'rejected').default('pending')
});