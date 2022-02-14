const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
    res.status(200).json({
        message: "This is user get route",
    });
});

module.exports = router;
