import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required().message({"any.required" : "Missing required name field"}),
    email: Joi.string().required().message({"any.required" : "Missing required name field"}), 
    phone: Joi.string().required().message({"any.required" : "Missing required name field"}), 

})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})