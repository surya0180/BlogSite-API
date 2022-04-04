const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { createJWT, encryptPassword } = require("../utils/common");

const login = async (email, password) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        if (!user) {
            return {
                status: false,
                message: "User does not exists!",
                data: {},
                errors: user,
            };
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return {
                status: false,
                message: "Invalid credentials!",
                data: {},
                errors: passwordMatch,
            };
        }

        const token = createJWT(user);
        return {
            status: true,
            message: "Logged In successfully",
            data: token,
            errors: {},
        };
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
                errors: {},
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
            status: true,
            message: "Registered user successfully",
            data: token,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    login,
    register,
};
