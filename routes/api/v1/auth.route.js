// Libraries
const express = require("express");
const { check } = require("express-validator");

// Controllers
const authController = require("../../../controllers/v1/auth.controller");

const router = express.Router();
router.post(
    "/login",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "password is required").exists(),
    ],
    authController.login
);

router.post(
    "/register",
    [
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a valid password with 6 or more characters"
        ).isLength({ min: 6 }),
    ],
    authController.register
);

module.exports = router;
