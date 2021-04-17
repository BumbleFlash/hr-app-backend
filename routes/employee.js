const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/authJwt");
const checkDuplicatesForEmployees = require("../middlewares/verifyHire");
const employeeController = require("../controllers/employee_controller");

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/add", [verifyToken, checkDuplicatesForEmployees], employeeController.addEmployee);

router.put("/update/:id", [verifyToken], employeeController.updateEmployee);


module.exports = router;
