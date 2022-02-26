const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token, authentication denied" });
    }

    try {
        // eslint-disable-next-line no-undef
        const decodedToken = jwt.verify(token, process.env.jwtSecret);

        req.user = decodedToken.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token in invalid" });
    }
};
