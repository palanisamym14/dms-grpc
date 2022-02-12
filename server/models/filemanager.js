const mongoose = require('mongoose');

const DirectorySchema = new mongoose.Schema(
    {
        type: { type: String, enum: ['DIR', 'FILE'], required: true },
        owner: { type: mongoose.ObjectId, required: true },
        content: { type: String, required: true },
        parent: { type: mongoose.ObjectId, default: null }
    },
    { collection: 'directory' },
    { timestamps: true }
)

// DirectorySchema.index({ slug: 1, userid: 1 }, { unique: true })

const model = mongoose.model('Directory', DirectorySchema)
module.exports = model;