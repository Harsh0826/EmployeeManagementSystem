const Joi = require('joi');
const Department = require('../models/Department');
const Employee = require('../models/Employee');

exports.getDepartments = (req, res) => {
  Department.find()
    .populate('company')
    .exec((err, departments) => {
      if (err) return res.status(500).send('Error fetching departments');
      res.send(departments);
    });
};

exports.createDepartment = (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) return res.status(400).send(err.details[0].message);

    const newDepartment = {
      DepartmentName: req.body.DepartmentName,
      company: req.body.CompanyID,
    };
    Department.create(newDepartment, (err, department) => {
      if (err) return res.status(500).send('Error creating department');
      res.send(department);
    });
  });
};

exports.updateDepartment = (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) return res.status(400).send(err.details[0].message);

    const updateDepartment = {
      DepartmentName: req.body.DepartmentName,
      company: req.body.CompanyID,
    };
    Department.findByIdAndUpdate(
      req.params.id,
      updateDepartment,
      (err, department) => {
        if (err) return res.status(500).send('Error updating department');
        res.send(updateDepartment);
      }
    );
  });
};

exports.deleteDepartment = (req, res) => {
  Employee.find({ department: req.params.id }, (err, employees) => {
    if (err) return res.status(500).send('Error finding employees');

    if (employees.length > 0) {
      return res
        .status(403)
        .send('Department associated with employees, cannot delete');
    }

    Department.findByIdAndRemove(req.params.id, (err, department) => {
      if (err) return res.status(500).send('Error deleting department');
      res.send(department);
    });
  });
};
