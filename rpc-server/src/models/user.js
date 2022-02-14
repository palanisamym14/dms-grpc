const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { collection: 'user' },
    { timestamps: true }
)

UserSchema.index({ email: 1}, { unique: true })
const model = mongoose.model('User', UserSchema)
module.exports = model;