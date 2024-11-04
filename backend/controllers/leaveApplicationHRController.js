const Joi = require('joi');
const Employee = require('../models/Employee');
const {
  LeaveApplication,
  LeaveApplicationHRValidation,
} = require('../models/LeaveApplication');

// Get all leave applications
exports.getLeaveApplications = (req, res) => {
  LeaveApplication.find()
    .populate({ path: 'employee' })
    .exec((err, leaveApplications) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching leave applications');
      }
      res.send(leaveApplications);
    });
};

// Update a leave application by HR
exports.updateLeaveApplication = (req, res) => {
  Joi.validate(req.body, LeaveApplicationHRValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedLeaveApplication = {
      Status: req.body.Status,
    };

    LeaveApplication.findByIdAndUpdate(
      req.params.id,
      { $set: updatedLeaveApplication },
      { new: true },
      (err, leaveApplication) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error updating leave application');
        }
        res.send(updatedLeaveApplication);
        console.log('Leave application updated:', updatedLeaveApplication);
      }
    );
  });
};

// Delete a leave application by HR
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
