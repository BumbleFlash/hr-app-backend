const mongoose = require('mongoose');

const Employee = mongoose.model("Employee",
    new mongoose.Schema({
        name: String,
        email: String,
        base_salary: Number,
        bonus: Number,
        insurance: Number,
        four_o_oneK: Number,
        total_salary: Number,
        recruitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = Employee;
