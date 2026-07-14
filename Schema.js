const Joi = require("joi");

const jProductSchema = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required(),
    price : Joi.number().required().min(0),
    image : Joi.string().required(),
    category : Joi.string().required(),
    stock : Joi.number().required().min(0),
    
});

module.exports = jProductSchema;