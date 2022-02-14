const userService = require('./../service/user');
const helper = require('./../helper');
const grpc = require("grpc");
exports.get = async (call, callback) => {
    try {
        const res = await userService.login(call.request)
        callback(null, { ...res });
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            message: helper.handleError(error),
        })
    }
}

exports.insert = async (call, callback) => {
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