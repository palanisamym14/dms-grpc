const client = require("./../rpc-client");
const ValidateSchema = require("./../schema/validator");
const InputUserSchema = require("./../schema/user.schema");
const getAuthToken = require('./../middleware/generatetoken');
const util = require('./../helper/util');

// Create and Save a new User
exports.create = async (req, res) => {
    try {
        const input = await ValidateSchema(req.body, InputUserSchema)
        client.userServiceClient.insert(input, (err, data) => {
            if (err) util.handlerError(res, err);
            if (!err) {
                res.json(data);
            }
        });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }

};

exports.login = async (req, res) => {
    try {
        const input = await ValidateSchema(req.body, InputUserSchema)
        client.userServiceClient.get(input, (err, data) => {
            if (err) util.handlerError(res, err);
            if (!err) {
                data.token = getAuthToken(data);
                res.json(data);
            }
        });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};
