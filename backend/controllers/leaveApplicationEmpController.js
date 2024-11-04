const Joi = require('joi');
const Employee = require('../models/Employee');
const {
  LeaveApplication,
  LeaveApplicationValidation,
} = require('../models/LeaveApplication');

// Get leave applications of an employee
exports.getLeaveApplications = (req, res) => {
  console.log('Fetching leave applications for employee ID:', req.params.id);
  Employee.findById(req.params.id)
    .populate('leaveApplication')
    .select('FirstName LastName MiddleName')
    .exec((err, employee) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send('Error fetching employee leave applications');
      }
      res.send(employee);
    });
};

// Add leave application for an employee
exports.addLeaveApplication = (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    Employee.findById(req.params.id, (err, employee) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error finding employee');
      }

      const newLeaveApplication = {
        Leavetype: req.body.Leavetype,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
        Reasonforleave: req.body.Reasonforleave,
        Status: req.body.Status,
        employee: req.params.id,
      };

      LeaveApplication.create(newLeaveApplication, (err, leaveApplication) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error creating leave application');
        }

        employee.leaveApplication.push(leaveApplication);
        employee.save(err => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error saving employee');
          }
          res.send(leaveApplication);
          console.log('New leave application saved:', leaveApplication);
        });
      });
    });
  });
};

// Update leave application of an employee
exports.updateLeaveApplication = (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedLeaveApplication = {
      Leavetype: req.body.Leavetype,
      FromDate: req.body.FromDate,
      ToDate: req.body.ToDate,
      Reasonforleave: req.body.Reasonforleave,
      Status: req.body.Status,
      employee: req.params.id,
    };

    LeaveApplication.findByIdAndUpdate(
      req.params.id,
      updatedLeaveApplication,
      { new: true },
      err => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error updating leave application');
        }
        res.send(updatedLeaveApplication);
        console.log('Updated leave application:', updatedLeaveApplication);
      }
    );
  });
};

// Delete leave application of an employee
exports.deleteLeaveApplication = (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error finding employee');
    }

    LeaveApplication.findByIdAndRemove(
      req.params.id2,
      (err, leaveApplication) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error deleting leave application');
        }

        Employee.updateOne(
          { _id: req.params.id },
          { $pull: { leaveApplication: req.params.id2 } },
          err => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send("Error updating employee's leave application array");
            }
            res.send(leaveApplication);
            console.log('Leave application deleted:', leaveApplication);
          }
        );
      }
    );
  });
};
