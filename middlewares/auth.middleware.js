const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("authorization");

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "No token, authentication denied",
            data: {},
            errors: {},
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.jwtSecret);
        req.user = decodedToken.user;
        next();
    } catch (err) {
        res.status(401).json({ status: false, message: "Token in invalid" });
    }
};
