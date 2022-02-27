const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.status(200).send({ message: "API is doing great 🐢." });
});

const userRoute = require("./user.route");
router.use("/user", userRoute);

const questionRoute = require("./question.route");
router.use("/question", questionRoute);

const profileRoute = require("./profile.route");
router.use("/profile", profileRoute);

const authRoute = require("./auth.route");
router.use("/auth", authRoute);

module.exports = router;