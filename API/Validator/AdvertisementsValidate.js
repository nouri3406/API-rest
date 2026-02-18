import Joi from "joi";

export const AdvertisementsSchema = Joi.object({
    company_name: Joi.string().min(3).required(50),
    job_name: Joi.string().min(3).required(50),
    contract_type: Joi.string().valid('CDI', 'CDD', 'Stage', 'Alternance', 'Freelance').required(),
    business_sector: Joi.string().required(),
    salary: Joi.number().required(),
    city: Joi.string().required(),
    adress: Joi.string().required(),
    description: Joi.string().min(20).required(),
});