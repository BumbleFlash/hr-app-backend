const User = require('../models/user.model');

/**
 * Checks if the employee email id is already present in the database.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - Pattern to pass control to the next middleware function.
 */
checkDuplicates = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: "Failed due to " + err});
            return;
        }
        if (user) {
            res.status(400).send({message: "Email is already taken"});
            return;
        }
        next();
    });
};

module.exports = checkDuplicates;
