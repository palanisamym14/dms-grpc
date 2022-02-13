const statusCodes = require('http').STATUS_CODES;
exports.handlerError = (res, payload) => {
    if (payload.details) {
        const data = JSON.parse(payload.details);
        if (data.code && statusCodes[data.code]) {
            res.status(data.code).json({ message: data.message || data });
        } else {
            res.status(500).json({ message: data.message || data });
        }
        return;
    }
    res.status(500).json(payload.details);
}