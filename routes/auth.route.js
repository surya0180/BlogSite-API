const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/profile.model");
const auth = require("../middlewares/auth.middleware");

//Check authentication
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Login User
router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

           
            jwt.sign(
                payload,
                // eslint-disable-next-line no-undef
                process.env.jwtSecret,
                { expiresIn: 36000000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
