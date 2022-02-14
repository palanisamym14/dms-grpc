const Joi = require('joi');

// user input schema
exports.CreateFileDirSchema = Joi.object({
    type: Joi.string().valid('DIR').default('DIR'),
    path: Joi.string().required(),
});

exports.FindFileDirSchema = Joi.object({
    id: Joi.string(),
});

exports.FileUploadSchema = this.FindFileDirSchema.keys({
    parent: Joi.string(),
    type: Joi.string().valid('FILE').default('FILE'),
});

exports.RenameFileDirSchema = Joi.object({
    id: Joi.string().required(),
    newName: Joi.string().required(), 
});
