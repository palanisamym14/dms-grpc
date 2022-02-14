const UserModal = require('../models/user');
const { isValidId } = require('../helper');
const bcrypt = require("bcrypt");
var grpc = require('grpc');

exports.getUser = async (id) => {
    if (!isValidId(id)) throw 'User not found';
    const user = await UserModal.findById(id);
    if (!user) throw 'User not found';
    return user;
}

// signup  
exports.signup = async (body) => {
    try {
        const user = new UserModal(body);
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        return { email: body.email, message: "User created" };
    } catch (error) {
        throw "Email already exist";
    }
};

// login route
exports.login = async (body) => {
    try {
        const user = await UserModal.findOne({ email: body.email });
        if (user) {
            // check user password with hashed password stored in the database
            const validPassword = await bcrypt.compare(body.password, user.password);
            if (validPassword) {
                return { email: user.email, id: user._id };
            } else {
                throw "Invalid Password"
            }
        } else {
            throw "User does not exist";
        }
    } catch (error) {
        throw error;
    }
};