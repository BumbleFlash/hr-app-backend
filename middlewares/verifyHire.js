const Employee = require('../models/employee.model');

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
