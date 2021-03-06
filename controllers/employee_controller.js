const Employee = require('../models/employee.model');
const User = require('../models/user.model');

/**
 * API to add employee to the database.
 * @param req - Request object
 * @param res - response object.
 */
exports.addEmployee = (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        base_salary: req.body.base_salary,
        bonus: req.body.bonus,
        insurance: req.body.insurance,
        four_o_oneK: req.body.four_o_oneK,
        total_salary: (req.body.base_salary + req.body.bonus - req.body.insurance - req.body.four_o_oneK)
    });
    User.findOne({
        email: req.body.recruitedBy.email
    }, (err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        employee.recruitedBy = [user._id];
        employee.updatedBy = [user._id];

        employee.save((err, employee) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.send({
                message: "Employee entered successfully",
                employee: employee
            })
        })
    });
};

/**
 * API to update an employee in the database. Inserts value if employee not found.
 * @param req - Request object
 * @param res - response object.
 */
exports.updateEmployee = (req, res) => {
    let query = {
        _id: req.params.id
    };

    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        base_salary: req.body.base_salary,
        bonus: req.body.bonus,
        insurance: req.body.insurance,
        four_o_oneK: req.body.four_o_oneK,
        total_salary: (req.body.base_salary + req.body.bonus - req.body.insurance - req.body.four_o_oneK)
    });

    User.findOne({
        email: req.body.recruitedBy.email
    }, (err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            res.status(404).send({message: "User not found"});
            return;
        }
        employee.updatedBy = [user._id];

        let updatedEmployee = employee.toObject();
        delete updatedEmployee._id;

        Employee.findOneAndUpdate(query, updatedEmployee, {
            upsert: true,
            useFindAndModify: false,
            new: true
        }, function (err, doc) {
            if (err) {
                res.status(500).send({message: err});
                return
            }

            res.status(200).send({
                message: "Employee updated successfully",
                employee: doc
            })
        })
    });
};

/**
 * API to fetch all employees.
 * @param req - Request object
 * @param res - response object.
 */
exports.getAllEmployees = (req, res) => {
    Employee.find({}, function (err, employee) {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({employees: employee});
    });
};
