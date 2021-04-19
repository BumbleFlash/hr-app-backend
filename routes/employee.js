const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/authJwt");
const checkDuplicatesForEmployees = require("../middlewares/verifyHire");
const checkDuplicatesBeforeUpdate = require("../middlewares/verifyUpdates");
const employeeController = require("../controllers/employee_controller");

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// POST request to add employee
router.post("/add", [verifyToken, checkDuplicatesForEmployees], employeeController.addEmployee);

// PUT request to update employee.
router.put("/update/:id", [verifyToken, checkDuplicatesBeforeUpdate], employeeController.updateEmployee);

// GET request to fetch all employees.
router.get("/all", [verifyToken], employeeController.getAllEmployees);

module.exports = router;
