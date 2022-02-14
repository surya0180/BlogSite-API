function errorMiddleware(req, res, next) {
    console.log("Testing for errors 😅");
    next();
}

module.exports = { errorMiddleware };
