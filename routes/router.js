const express = require("express");
const router = express.Router();

const userRoute = require("./api/v1/user.route");
const authRoute = require("./api/v1/auth.route");

router.get("/", function (req, res) {
    res.status(200).send({ message: "API is doing great 🐢." });
});

router.use("/user", userRoute);
router.use("/auth", authRoute);

module.exports = router;
