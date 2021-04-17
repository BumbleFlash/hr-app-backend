const config = require("../config/auth_config");
const User = require('../models/user.model');
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = (req, res) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        user.save(err => {
            if (err) {
                res.status(500).send({message: "User registration failed due to: " + err});
                return;
            }
            res.send({
                message: "User Registered successfully",
                email: req.body.email,
                username: req.body.username,
            })
        })
    })
};
