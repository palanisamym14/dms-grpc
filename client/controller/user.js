const client = require("./../client");
const ValidateSchema = require("./../schema/validator");
const InputUserSchema = require("./../schema/user.schema");
const getAuthToken = require('./../middleware/generatetoken');
// Create and Save a new Note
exports.create = async (req, res) => {
    try {
        await ValidateSchema(req.body, InputUserSchema)
        client.userServiceClient.insert(req.body, (err, data) => {
            console.log(err)
            if (err) res.status(500).json(err);
            if (!err) {
                res.json(data);
            }
        });
    } catch (error) {
        res.status(error.code || 500).json({message: error.message || error})
    }
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    client.userServiceClient.get(req.body, (err, data) => {
        if (err) res.status(500).json(err);
        if (!err) {
            data.token = getAuthToken(data);
            res.json(data);
        }
    });
};
