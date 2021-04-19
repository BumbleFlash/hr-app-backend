const mongoose = require('mongoose');

/**
 * Model to store user information.
 * @type {Model<Document>}
 */
const User = mongoose.model("User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
    })
);

module.exports = User;
