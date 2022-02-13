exports.handlerError = (res, payload) => {
    if (payload.details) {
        const data = JSON.parse(payload.details);
        if (data.code) {
            res.status(data.code).json({ message: data.message || data });
            return;
        }
    }
    res.status(500).json(payload.details);
}