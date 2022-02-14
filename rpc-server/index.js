const PROTO_PATH = "./proto/filemanager.proto";
const mongoose = require('mongoose');
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const usercontroller = require('./controller/user');
const filemanagerService = require('./service/filemanager');
const filemanagercontroller = require('./controller/filemanager');
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
    getAll: filemanagercontroller.getAll,
    get: filemanagercontroller.get,
    insert: filemanagercontroller.insert,
    uploadFile: filemanagercontroller.uploadFile,
    renameDirFile: filemanagercontroller.renameDirFile,
    downloadFile: filemanagercontroller.renameDirFile,
    remove: filemanagercontroller.remove,
});

server.addService(proto.UserService.service, {
    get: usercontroller.get,
    insert: usercontroller.insert,
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
(async () => await mongoose.connect(process.env.DB_CONNECTION_STRING))();
server.start();