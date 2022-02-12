const Joi = require('joi');

InputUserSchema = Joi.object({
    email: Joi.string()
        .email().required(),
    password: Joi.string()
        .min(3)
        .max(50)
        .required(),

});

module.exports = InputUserSchema;