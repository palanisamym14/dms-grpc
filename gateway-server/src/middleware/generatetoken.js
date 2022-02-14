const jwt = require("jsonwebtoken");

// generate the Jwt token and set expairy time as 2 hours
const getAuthToken = (payload) => jwt.sign(
    { ...payload },
    process.env.TOKEN_KEY,
    {
        expiresIn: "2h",
    }
);

module.exports = getAuthToken;