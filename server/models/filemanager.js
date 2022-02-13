const mongoose = require('mongoose');

const DirectorySchema = new mongoose.Schema(
    {
        type: { type: String, enum: ['DIR', 'FILE'], required: true },
        owner: { type: mongoose.ObjectId, required: true },
        path: { type: String, required: true },
        parent: { type: mongoose.ObjectId}
    },
    { collection: 'directory' },
    { timestamps: true }
)

DirectorySchema.index({ owner: 1, parent: 1, path: 1 }, { unique: true });
DirectorySchema.index({ owner: 1, parent: 1, type: 1, path:1}, { unique: true });

const model = mongoose.model('directory', DirectorySchema)
module.exports = model;