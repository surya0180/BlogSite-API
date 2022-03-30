const User = require("../models/users.model");

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const addUser = async (firstname, lastname, email, password) => {
    try {
        const user = new User({
            firstname,
            lastname,
            email,
            password,
        });
        return user.save();
    } catch (error) {
        return error.message;
    }
};

module.exports = {
    findUserByEmail,
    addUser,
};
