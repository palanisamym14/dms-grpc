const client = require("./../client");
const ValidateSchema = require("./../schema/validator");
const InputFileManager = require("./../schema/filemanager");
const fs = require('fs')
// Create file /dir

function bufferToBase64DataContent(contentType, body) {
    if (body) {
        return 'data:' + contentType + ';base64,' + body?.toString('base64');
    }
    return null;
}
exports.create = async (req, res) => {
    try {
        const input = await ValidateSchema(req.body, InputFileManager);
        input.owner = req['user']["id"];

        if (input.type === "FILE") {
            if (req["file"] == null) {
                throw { code: 403, message: 'content is required' }
            }
            input.content = fs.readFileSync(req.file.path).toString('base64');
            fs.unlinkSync(req.file.path);
            input.originalname = req.file.originalname
            input.mimetype = req.file.mimetype
        }


        client.directoryServiceClient.insert({ ...input }, (err, data) => {
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
