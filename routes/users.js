const express = require('express');
const router = express.Router();
const checkDuplicates = require("../middlewares/verifySignUp");
const userController = require("../controllers/user_controller");

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/user/registerUser", [
    checkDuplicates
], userController.registerUser);

router.post("/user/login", userController.login);

module.exports = router;
