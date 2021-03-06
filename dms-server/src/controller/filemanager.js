const filemanagerService = require('../service/filemanager');
const helper = require('../helper');
const fs = require('fs');
const grpc = require("grpc");


// get all directors by given owner/ userid, returns all root level folders and files
// user pass the id , returns next level record
exports.getAll = async (call, callback) => {
    try {
        const res = await filemanagerService.findAll(call.request)
        callback(null, { directories: res });
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            message: helper.handleError(error),
        })
    }
};

// get specfic file or folder for given id
exports.get = async (call, callback) => {
    try {
        const res = await filemanagerService.findOne(call.request)
        callback(null, { ...res });
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            message: helper.handleError(error),
        })
    }
};

// create the folder and returns the same
exports.insert = async (call, callback) => {
    try {
        const res = await filemanagerService.create(call.request)
        callback(null, { ...res });
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            message: helper.handleError(error),
        })
    }
};

// recive the user input file and move to the storage devices
exports.uploadFile = async (call, callback) => {
    try {
        const res = await filemanagerService.uploadFile(call.request)
        callback(null, { ...res });
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            message: helper.handleError(error),
        })
    }
}

// recive the user input  renames the file or folder by given id
exports.renameDirFile = async (call, callback) => {
    try {
        const res = await filemanagerService.renameDirFile(call.request)
        callback(null, { ...res });
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            message: helper.handleError(error),
        })
    }
};

//read the file for given input id and  return the file as stream
exports.downloadFile = async (call, _) => {
    try {

        const res = await filemanagerService.downloadFile(call.request);
        call.write({ fileName: res.filename, contentType: res.mimetype });
        const readStream = fs.createReadStream(res.file);
        readStream.on('data', (chunk) => {
            call.write({
                message: chunk
            });
        })
        readStream.on('end', () => {
            call.end();
        });
    } catch (error) {
        call.write({
            error: JSON.stringify({ code: grpc.status.UNKNOWN, message: helper.handleError(error) })
        });
        call.end();
    }
};

// delete the file or folder for given id
exports.remove = async (call, callback) => {
    try {
        const res = await filemanagerService.delete(call.request)
        callback(null, { ...res });
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            message: helper.handleError(error),
        })
    }
};