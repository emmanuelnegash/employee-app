const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let crudEmployee = new Schema({
    employee_name: {
        type: String
    },
    employee_bdate: {
        type: Date
    },
    employee_gender: {
        type: String
    },
    employee_salary: {
        type: Number
    }
});

module.exports = mongoose.model('employee_reg', crudEmployee);
