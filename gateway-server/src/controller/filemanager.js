const client = require("../rpc-client");
const ValidateSchema = require("../schema/validator");
const fileManagerSchema = require("../schema/filemanager");
const fs = require('fs')
const util = require('../helper/util');
const { Readable } = require('stream');

// // this method handle request of creat the directory
exports.create = async (req, res) => {
    try {

        // ValidateSchema helps to validate the input value and restrict the input items
        const input = await ValidateSchema(req.body, fileManagerSchema.CreateFileDirSchema);
        // userId decoded from the jwt token
        input.owner = req.user.id;

        client.directoryServiceClient.insert({ ...input }, (err, data) => {
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data);
            }
        });

    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

// upload file to rpc server
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
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data);
            }
        });

    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

// download file takes an input of file id and return back file as a stream
exports.downloadFile = async (req, res) => {
    try {
        const input = {
            owner: req.user.id,
            id: req.params.id
        }
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
                inStream = null;
                util.handlerError(res,{ details:response.error});
            }
        });

        call.on('end', function (message) {
            if (inStream) {
                inStream.push(null)
                inStream.pipe(res);
            }
        });

    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

// get the selected directory/ file using given id 
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

// Fetch all dir/file from rootlevel. if we passed any parent id, it will return specific inputs child items
exports.findAll = async (req, res) => {
    try {
        const input = await ValidateSchema(req.query, fileManagerSchema.FindFileDirSchema);
        input.owner = req.user.id;
        client.directoryServiceClient.getAll({ ...input }, (err, data) => {
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data?.directories || []);
            }
        });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

// rename the file or folder for given input
exports.rename = async (req, res) => {
    try {
        const input = await ValidateSchema(req.body, fileManagerSchema.RenameFileDirSchema);
        input.owner = req.user.id;
        client.directoryServiceClient.renameDirFile({ ...input }, (err, data) => {
            if (err) util.handlerError(res, (err));
            if (!err) {
                res.json(data);
            }
        });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

// Delete the file or folder for given input, if dir contain child items it will return error
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

