const mongoose = require('mongoose');

// return true/false give input id is valid mongoid

const isValidId = (id) => {
    return mongoose.isValidObjectId(id);
}

// handle the error message
const handleError = (err) => {
    if (err.code === 11000) {
        return JSON.stringify({ code: 422, message: 'Duplicate Not Allowed' });
    }
    return JSON.stringify({ code: 500, message: err.message || err});
}

// construct the path of storage device
constructExistingPath = (data, fileName) => {
    let path = fileName;
    if (data.paths?.length) {
        Array.from(data.paths).forEach(_path => {
            path = `${_path._id}/${path}`
        });
        return path;
    }
    return path
}

module.exports = { isValidId, handleError, constructExistingPath}
