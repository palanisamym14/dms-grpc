const jwt = require("jsonwebtoken");

const getAuthToken = (payload) => jwt.sign(
    { ...payload },
    process.env.TOKEN_KEY,
    {
        expiresIn: "2h",
    }
);

module.exports = getAuthToken;