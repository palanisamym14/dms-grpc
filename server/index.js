const PROTO_PATH = "./proto/filemanager.proto";
const mongoose = require('mongoose');
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const userService = require('./service/user');
const filemanagerService = require('./service/filemanager');
require('dotenv').config()

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const proto = grpc.loadPackageDefinition(packageDefinition);


const server = new grpc.Server();
const customers = [
    {
        _id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        parent: "John Bolton",
        content: "Address",
        owner: "Address 1"
    },
    {
        _id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        parent: "John Bolton",
        content: "Address",
        owner: "Address 1"
    },
];

server.addService(proto.DirectoryService.service, {
    getAll: async (_, callback) => {
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

    get: async (call, callback) => {
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

    insert: async (call, callback) => {
        try {
            const res = await filemanagerService.create(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: JSON.stringify(error),
            })
        }
    },

    update: async (call, callback) => {
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

    remove: async (call, callback) => {
        try {
            const res = await userService.signup(call.request)
            callback(null, { ...res });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                message: JSON.stringify(error),
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