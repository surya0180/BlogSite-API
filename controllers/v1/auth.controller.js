const { validationResult } = require("express-validator");
const authService = require("../../services/auth.service");

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: "Validation failed",
                data: {},
                errors: errors.array(),
            });
        }
        const body = req.body;
        const authToken = await authService.login(body.email, body.password);
        if (!authToken) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials",
                data: {},
                errors: {},
            });
        }
        return res.status(200).json({
            status: true,
            message: "Logged in Successfully",
            data: authToken,
            error: {},
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server Error",
            data: {},
            error: err.message,
        });
    }
};

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: "Validation failed",
                data: {},
                errors: errors.array(),
            });
        }
        const body = req.body;
        const response = await authService.register(
            body.firstname,
            body.lastname,
            body.email,
            body.password
        );
        return res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: {},
            errors: err.message,
        });
    }
};

module.exports = {
    login,
    register,
};
