const client = require("./../rpc-client");
const ValidateSchema = require("./../schema/validator");
const fileManagerSchema = require("./../schema/filemanager");
const fs = require('fs')
const util = require('./../helper/util');
const { Readable } = require('stream');

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

        client.directoryServiceClient.uploadFile({ ...input }, (err, data) => {
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
        const input = {
            owner: req.user.id,
            id: req.params.id
        }
        console.log(input);
        let call = client.directoryServiceClient.downloadFile({ ...input });
        let inStream = new Readable({
            read() { }
        });

        call.on('data', function (response) {
            if (response.fileName) {
                res.setHeader('Content-disposition', 'attachment; filename=' + response.fileName);
            }
            if (response.contentType) {
                res.setHeader('Content-type', response.contentType);
            }
            if (response.message) {
                inStream.push(response.message);
            }
            if (response.error) {
                console.log(response.error);
                inStream = null;
                util.handlerError(res,{ details:response.error});
            }
        });

        call.on('end', function (message) {
            console.log(message);
            if (inStream) {
                inStream.push(null)
                inStream.pipe(res);
            }
        });

    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

exports.findOne = async (req, res) => {
    const input = await ValidateSchema(req.params, fileManagerSchema.FindFileDirSchema);
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
        client.directoryServiceClient.getAll({ ...input }, (err, data) => {
            console.log(err)
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data?.directories || []);
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

exports.delete = async (req, res) => {
    const input = await ValidateSchema(req.params, fileManagerSchema.FindFileDirSchema);
    input.owner = req.user.id;
    client.directoryServiceClient.remove(input, (err, data) => {
        if (err) util.handlerError(res, (err));
        if (!err) {
            res.json(data);
        }
    });
};
