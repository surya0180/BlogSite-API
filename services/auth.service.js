const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { createJWT, encryptPassword } = require("../utils/common");

const login = async (email, password) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!user || !passwordMatch) {
            return false;
        }

        const token = createJWT(user);
        return token;
    } catch (error) {
        throw error;
    }
};

const register = async (firstname, lastname, email, password) => {
    try {
        const user = await userRepo.findUserByEmail(email);

        if (user) {
            return {
                status: false,
                message: "User already exists",
                data: {},
                errors: user,
            };
        }

        const encryptedPassword = await encryptPassword(password);
        const newUser = await userRepo.addUser(
            firstname,
            lastname,
            email,
            encryptedPassword
        );
        const token = createJWT(newUser);
        return {
            token,
            user: newUser,
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    login,
    register,
};
