const PROTO_PATH = "./proto/filemanager.proto";
const mongoose = require('mongoose');
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const userService = require('./service/user');
const filemanagerService = require('./service/filemanager');
require('dotenv').config()
const helper = require('./helper');
const fs = require('fs');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const proto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();


server.addService(proto.DirectoryService.service, {
    getAll: async (call, callback) => {
        try {
            const res = await filemanagerService.findAll(call.request)
            callback(null, { directories: res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: helper.handleError(error),
            })
        }
    },

    get: async (call, callback) => {
        try {
            const res = await filemanagerService.findOne(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: helper.handleError(error),
            })
        }
    },

    insert: async (call, callback) => {
        try {
            const res = await filemanagerService.create(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: helper.handleError(error),
            })
        }
    },
    uploadFile: async (call, callback) => {
        try {
            const res = await filemanagerService.uploadFile(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: helper.handleError(error),
            })
        }
    },

    renameDirFile: async (call, callback) => {
        try {
            const res = await filemanagerService.renameDirFile(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: helper.handleError(error),
            })
        }
    },
    downloadFile: async (call, callback) => {
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
                error: { code: grpc.status.UNKNOWN,  message: helper.handleError(error) }
            });
            call.destroy();
        }
    },

    remove: async (call, callback) => {
        try {
            const res = await userService.signup(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: helper.handleError(error),
            })
        }
    }
});

server.addService(proto.UserService.service, {
    get: async (call, callback) => {
        try {
            const res = await userService.login(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: helper.handleError(error),
            })
        }
    },
    insert: async (call, callback) => {
        try {
            const res = await userService.signup(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: helper.handleError(error),
            })
        }
    },
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
(async () => await mongoose.connect(process.env.DB_CONNECTION_STRING))();
server.start();