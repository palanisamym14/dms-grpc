const PROTO_PATH = "./proto/filemanager.proto";
const mongoose = require('mongoose');
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const filemanagerModal = require('./models/filemanager');
const userService = require('./service/user');
require('dotenv').config()

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const proto = grpc.loadPackageDefinition(packageDefinition);


const server = new grpc.Server();

server.addService(proto.UserService.service, {
    get: async (call, callback) => {
        try {
            const res = await userService.login(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: JSON.stringify(error),
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
                message: JSON.stringify(error),
            })
        }
    },
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
(async () => await mongoose.connect(process.env.DB_CONNECTION_STRING))();
server.start();