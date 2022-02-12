const Joi = require('joi');

CreateFileDirSchema = Joi.object({
    type: Joi.string().valid('DIR', 'FILE').required(),
    parent: Joi.string().when('type', { is: 'DIR', then: Joi.forbidden() }),
    content: Joi.string().when('type', { is: 'FILE', then: Joi.forbidden(), otherwise: Joi.required()}),
});

module.exports = CreateFileDirSchema;