const Joi = require('joi');
const Employee = require('../models/Employee');
const { Salary, SalaryValidation } = require('../models/Salary');

// Get all salaries
exports.getSalaries = (req, res) => {
  Employee.find()
    .populate({
      path: 'salary',
    })
    .select('FirstName LastName MiddleName')
    .exec((err, employees) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching salaries');
      }
      const filteredEmployees = employees.filter(
        data => data.salary.length === 1
      );
      res.send(filteredEmployees);
    });
};

// Create a new salary
exports.createSalary = (req, res) => {
  Joi.validate(req.body, SalaryValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    Employee.findById(req.params.id, function (err, employee) {
      if (err) {
        console.log(err);
        return res.status(500).send('Error finding employee');
      }

      if (employee.salary.length === 0) {
        const newSalary = {
          BasicSalary: req.body.BasicSalary,
          BankName: req.body.BankName,
          AccountNo: req.body.AccountNo,
          AccountHolderName: req.body.AccountHolderName,
          IFSCcode: req.body.IFSCcode,
          TaxDeduction: req.body.TaxDeduction,
        };

        Salary.create(newSalary, function (err, salary) {
          if (err) {
            console.log(err);
            return res.status(500).send('Error creating salary');
          }

          employee.salary.push(salary);
          employee.save(function (err) {
            if (err) {
              console.log(err);
              return res.status(500).send('Error saving employee');
            }
            res.send(salary);
            console.log('New salary saved');
          });
        });
      } else {
        res
          .status(403)
          .send('Salary information about this employee already exists');
      }
    });
  });
};

// Update an existing salary
exports.updateSalary = (req, res) => {
  Joi.validate(req.body, SalaryValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedSalary = {
      BasicSalary: req.body.BasicSalary,
      BankName: req.body.BankName,
      AccountNo: req.body.AccountNo,
      AccountHolderName: req.body.AccountHolderName,
      IFSCcode: req.body.IFSCcode,
      TaxDeduction: req.body.TaxDeduction,
    };

    Salary.findByIdAndUpdate(
      req.params.id,
      updatedSalary,
      { new: true },
      (err, salary) => {
        if (err) {
          return res.status(500).send('Error updating salary');
        }
        res.send(updatedSalary);
      }
    );
  });
};

// Delete a salary
exports.deleteSalary = (req, res) => {
  Employee.findById(req.params.id, function (err, employee) {
    if (err) {
      console.log(err);
      return res.status(500).send('Error finding employee');
    }

    Salary.findByIdAndRemove(employee.salary[0], function (err, salary) {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting salary');
      }

      Employee.update(
        { _id: req.params.id },
        { $pull: { salary: employee.salary[0] } },
        function (err) {
          if (err) {
            console.log(err);
            return res.status(500).send('Error updating employee salary');
          }
          res.send(salary);
        }
      );
    });
  });
};
