const Joi = require('joi');
const {
  Employee,
  EmployeeValidation,
  EmployeeValidationUpdate,
} = require('../models/Employee');

// Get all employees
exports.getEmployees = (req, res) => {
  Employee.find()
    .populate({
      path: 'role position department',
    })
    .select('-salary -education -familyInfo -workExperience -Password')
    .exec((err, employees) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching employees');
      }
      res.send(employees);
    });
};

// Create a new employee
exports.createEmployee = (req, res) => {
  Joi.validate(req.body, EmployeeValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const newEmployee = {
      Email: req.body.Email,
      Password: req.body.Password,
      role: req.body.RoleID,
      Account: req.body.Account,
      Gender: req.body.Gender,
      FirstName: req.body.FirstName,
      MiddleName: req.body.MiddleName,
      LastName: req.body.LastName,
      DOB: req.body.DOB,
      ContactNo: req.body.ContactNo,
      EmployeeCode: req.body.EmployeeCode,
      department: req.body.DepartmentID,
      position: req.body.PositionID,
      DateOfJoining: req.body.DateOfJoining,
      TerminateDate: req.body.TerminateDate,
    };

    Employee.create(newEmployee, (err, employee) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error creating employee');
      }
      res.send(employee);
      console.log('New employee saved');
    });
  });
};

// Update an existing employee
exports.updateEmployee = (req, res) => {
  Joi.validate(req.body, EmployeeValidationUpdate, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedEmployee = {
      Email: req.body.Email,
      Account: req.body.Account,
      role: req.body.RoleID,
      Gender: req.body.Gender,
      FirstName: req.body.FirstName,
      MiddleName: req.body.MiddleName,
      LastName: req.body.LastName,
      DOB: req.body.DOB,
      ContactNo: req.body.ContactNo,
      EmployeeCode: req.body.EmployeeCode,
      department: req.body.DepartmentID,
      position: req.body.PositionID,
      DateOfJoining: req.body.DateOfJoining,
      TerminateDate: req.body.TerminateDate,
    };

    Employee.findByIdAndUpdate(
      req.params.id,
      updatedEmployee,
      { new: true },
      (err, employee) => {
        if (err) {
          return res.status(500).send('Error updating employee');
        }
        res.send(updatedEmployee);
      }
    );
  });
};

// Delete an employee
exports.deleteEmployee = (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, employee) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error deleting employee');
    }
    res.send(employee);
  });
};
