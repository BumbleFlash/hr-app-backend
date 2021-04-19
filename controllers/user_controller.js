const config = require("../config/auth_config");
const User = require('../models/user.model');
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * API to register a user. Password is hashed synchronously using bcrypt.
 * @param req - Request object
 * @param res - response object.
 */
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

/**
 * API to login an employee. Returns success status if the user is found with the respective password.
 * @param req - Request object
 * @param res - response object.
 */
exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            return res.status(404).send({message: "User not found"})
        }

        // Compare passwords.
        let isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        let accessToken = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: accessToken
        });
    });
};
