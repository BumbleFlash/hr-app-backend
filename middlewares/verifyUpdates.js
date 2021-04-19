const Employee = require('../models/employee.model');

/**
 * Checks if the employee email id to be updated is not taken by someone else.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - Pattern to pass control to the next middleware function.
 */
checkDuplicatesBeforeUpdate = (req,res,next) => {
  Employee.findOne({
      email: req.body.email
  }).exec((err, employee) => {
      if (err) {
          res.status(500).send({message: "Failed due to " + err});
          return;
      }
      if (employee) {
          if (String(employee._id) !== req.params.id) {
              res.status(400).send({message: "Email is already taken by another employee"});
              return;
          }
      }
      next();
  });
};

module.exports = checkDuplicatesBeforeUpdate;
