const Joi = require('joi');
const Employee = require('../models/Employee');
const {
  WorkExperience,
  WorkExperienceValidation,
} = require('../models/WorkExperience');

// Get work experience of an employee
exports.getWorkExperience = (req, res) => {
  console.log('Fetching work experience for employee ID:', req.params.id);
  Employee.findById(req.params.id)
    .populate('workExperience')
    .select('FirstName LastName MiddleName')
    .exec((err, employee) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching employee work experience');
      }
      res.send(employee);
    });
};

// Add work experience for an employee
exports.addWorkExperience = (req, res) => {
  Joi.validate(req.body, WorkExperienceValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    Employee.findById(req.params.id, (err, employee) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error finding employee');
      }

      const newWorkExperience = {
        CompanyName: req.body.CompanyName,
        Designation: req.body.Designation,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
      };

      WorkExperience.create(newWorkExperience, (err, workExperience) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error creating work experience');
        }

        employee.workExperience.push(workExperience);
        employee.save(err => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error saving employee');
          }
          res.send(workExperience);
          console.log('New work experience saved:', workExperience);
        });
      });
    });
  });
};

// Update work experience of an employee
exports.updateWorkExperience = (req, res) => {
  Joi.validate(req.body, WorkExperienceValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedWorkExperience = {
      CompanyName: req.body.CompanyName,
      Designation: req.body.Designation,
      FromDate: req.body.FromDate,
      ToDate: req.body.ToDate,
    };

    WorkExperience.findByIdAndUpdate(
      req.params.id,
      updatedWorkExperience,
      { new: true },
      err => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error updating work experience');
        }
        res.send(updatedWorkExperience);
        console.log('Updated work experience:', updatedWorkExperience);
      }
    );
  });
};

// Delete work experience of an employee
exports.deleteWorkExperience = (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error finding employee');
    }

    WorkExperience.findByIdAndRemove(req.params.id2, (err, workExperience) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting work experience');
      }

      Employee.updateOne(
        { _id: req.params.id },
        { $pull: { workExperience: req.params.id2 } },
        err => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send("Error updating employee's work experience array");
          }
          res.send(workExperience);
          console.log('Work experience deleted:', workExperience);
        }
      );
    });
  });
};
