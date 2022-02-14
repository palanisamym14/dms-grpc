const PROTO_PATH = "./proto/filemanager.proto";
const mongoose = require('mongoose');
const grpc = require("grpc");
require('dotenv').config()

const protoLoader = require("@grpc/proto-loader");
const usercontroller = require('./controller/user');
const filemanagercontroller = require('./controller/filemanager');

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
    downloadFile: filemanagercontroller.downloadFile,
    remove: filemanagercontroller.remove,
});

server.addService(proto.UserService.service, {
    get: usercontroller.get,
    insert: usercontroller.insert,
});
const rpcUrl = `${process.env.RPC_SERVER_BASE_URL}:${process.env.RPC_SERVER_BASE_PORT}`;

server.bind(rpcUrl, grpc.ServerCredentials.createInsecure());
console.log("Server running at " + rpcUrl);

(async () => await mongoose.connect(process.env.DB_CONNECTION_STRING))();
server.start();