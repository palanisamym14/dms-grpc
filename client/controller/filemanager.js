const client = require("./../client");
const ValidateSchema = require("./../schema/validator");
const fileManagerSchema = require("./../schema/filemanager");
const fs = require('fs')
const util = require('./../util');


exports.create = async (req, res) => {
    try {
        const input = await ValidateSchema(req.body, fileManagerSchema.CreateFileDirSchema);
        input.owner = req.user.id;
        client.directoryServiceClient.insert({ ...input }, (err, data) => {
            console.log(err)
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data);
            }
        });

    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};


exports.uploadFile = async (req, res) => {
    try {
        const input = await ValidateSchema(req.body, fileManagerSchema.FileUploadSchema);
        if (req["file"] == null) {
            throw { code: 403, message: 'file is required' }
        }

        input.content = fs.readFileSync(req.file.path).toString('base64');
        fs.unlinkSync(req.file.path);
        input.originalname = req.file.originalname;
        input.mimetype = req.file.mimetype;
        input.owner = req.user.id;

        client.directoryServiceClient.insert({ ...input }, (err, data) => {
            console.log(err)
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data);
            }
        });

    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

exports.downloadFile = async (req, res) => {
    try {
       
        client.directoryServiceClient.insert({ ...input }, (err, data) => {
            console.log(err)
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data);
            }
        });

    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

exports.findOne = (req, res) => {
    const input = req.params;
    input.owner = req.user.id;
    client.directoryServiceClient.get(input, (err, data) => {
        if (err) util.handlerError(res, (err));
        if (!err) {
            res.json(data);
        }
    });
};

exports.findAll = async (req, res) => {
    try {
        const input = await ValidateSchema(req.query, fileManagerSchema.FindFileDirSchema);
        input.owner = req.user.id;
        console.log(input);
        client.directoryServiceClient.getAll({ ...input }, (err, data) => {
            console.log(err)
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data);
            }
        });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

exports.rename = async (req, res) => {
    try {
        const input = await ValidateSchema(req.body, fileManagerSchema.RenameFileDirSchema);
        input.owner = req.user.id;
        console.log(input);
        client.directoryServiceClient.renameDirFile({ ...input }, (err, data) => {
            console.log(err)
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data);
            }
        });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

