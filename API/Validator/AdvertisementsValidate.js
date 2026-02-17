import Joi from "joi";

export const AdvertisementsSchema = Joi.object({
    company_name: Joi.string(3).required(50),
    job_name: Joi.string(3).required(50),
    contract_type: Joi.string('CDI', 'CDD', 'Stage', 'Alternance', 'Freelance').required(),
    business_sector: Joi.string().required(),
    salary: Joi.number().required(),
    city: Joi.string().required(),
    adress: Joi.string().required(),
    description: Joi.string(20).required(),
});