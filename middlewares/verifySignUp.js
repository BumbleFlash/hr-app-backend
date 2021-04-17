const User = require('../models/user.model');

checkDuplicates = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: "Failed due to " + err});
            return;
        }
        if (user) {
            res.schema(400).send({message: "Username is already taken"})
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({message: "Failed due to " + err});
                return;
            }
            if (user) {
                res.schema(400).send({message: "Email is already taken"})
            }
            next();
        });
    });

};

module.exports = checkDuplicates;
