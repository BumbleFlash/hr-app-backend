const Employee = require('../models/employee.model');

/**
 * Checks if the employee email id is already present in the database.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - Pattern to pass control to the next middleware function.
 */
checkDuplicatesForEmployees = (req, res, next) => {
    Employee.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: "Failed due to " + err});
            return;
        }
        if (user) {
            res.status(400).send({message: "Employee already hired. Click Update if you want to update"});
            return;
        }
        next();
    });
};

module.exports = checkDuplicatesForEmployees;
