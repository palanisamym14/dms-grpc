const FilemanagerModel = require('../models/filemanager');
const fileProcessor = require('./managefile');

// Create and Save a new directory Model
exports.create = async (body) => {
    try {
        if (body.type == 'FILE') {
            if (body.parent) {
                const dir = await FilemanagerModel.findOne({ _id: body.parent, type: 'DIR' });
                if (!dir) {
                    throw "parent id not an directory"
                }
            }
            await fileProcessor.writeFile(body);
            body.content = body.originalname;
        }

        const user = new FilemanagerModel(body);
        return user.save();
    } catch (error) {
        throw error;
    }
};

// Retrieve and return all directories from the database.
exports.findAll = (req, res) => {
    FilemanagerModel.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    FilemanagerModel.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "FilemanagerModel not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "FilemanagerModel not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "directory content can not be empty"
        });
    }

    // Find note and update it with the request body
    FilemanagerModel.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled FilemanagerModel",
        content: req.body.content
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "FilemanagerModel not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "FilemanagerModel not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    FilemanagerModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "DIR/File not found with id " + req.params.noteId
                });
            }
            res.send({ message: "DIR/File deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "DIR/File not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
};