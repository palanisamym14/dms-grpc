const mongoose = require('mongoose');
const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}

const handleError = (err) => {
    if (err.code === 11000) {
        console.log(err);
        return JSON.stringify({ code: 422, message: 'Duplicate Not Allowed' });
    }
    return JSON.stringify({ message: err});
}

module.exports = { isValidId, handleError}
