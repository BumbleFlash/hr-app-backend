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

// POST request to register user.
router.post("/user/registerUser", [
    checkDuplicates
], userController.registerUser);

// POST request to login user.
router.post("/user/login", userController.login);

module.exports = router;
