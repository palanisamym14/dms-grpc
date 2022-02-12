const client = require("./../client");
const ValidateSchema = require("./../schema/validator");
const InputFileManager = require("./../schema/filemanager");

// Create file /dir
exports.create = async (req, res) => {
    try {
        const input = await ValidateSchema(req.body, InputFileManager);
        input.owner = req['user']["id"];
        console.log(input);
        client.directoryServiceClient.insert({...input}, (err, data) => {
            console.log(err)
            if (err) res.status(500).json(err);
            if (!err) {
                res.json(data);
            }
        });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message || error })
    }
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    client.userServiceClient.get(req.body, (err, data) => {
        if (err) res.status(500).json(err);
        if (!err) {
            res.json(data);
        }
    });
};
