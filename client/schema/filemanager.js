const Joi = require('joi');

exports.CreateFileDirSchema = Joi.object({
    type: Joi.string().valid('DIR').default('DIR'),
    path: Joi.string().required(),
});

exports.FindFileDirSchema = Joi.object({
    parent: Joi.string(),
});

exports.FileUploadSchema = this.FindFileDirSchema.keys({
    type: Joi.string().valid('FILE').default('FILE'),
});

exports.RenameFileDirSchema = Joi.object({
    id: Joi.string().required(),
    newName: Joi.string().required(), 
});
