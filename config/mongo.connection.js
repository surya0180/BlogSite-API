const mongoose = require("mongoose");

mongoose
    // eslint-disable-next-line no-undef
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = {};
