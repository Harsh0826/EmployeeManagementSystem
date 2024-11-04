const Joi = require('joi');
const Employee = require('../models/Employee');
const { Education, EducationValidation } = require('../models/Education');

// Get education of an employee
exports.getEducation = (req, res) => {
  console.log('Fetching education for employee ID:', req.params.id);
  Employee.findById(req.params.id)
    .populate('education')
    .select('FirstName LastName MiddleName')
    .exec((err, employee) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching employee education');
      }
      res.send(employee);
    });
};

// Add education for an employee
exports.addEducation = (req, res) => {
  Joi.validate(req.body, EducationValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    Employee.findById(req.params.id, (err, employee) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error finding employee');
      }

      const newEducation = {
        SchoolUniversity: req.body.SchoolUniversity,
        Degree: req.body.Degree,
        Grade: req.body.Grade,
        PassingOfYear: req.body.PassingOfYear,
      };

      Education.create(newEducation, (err, education) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error creating education');
        }

        employee.education.push(education);
        employee.save((err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error saving employee');
          }
          res.send(education);
          console.log('New education saved:', education);
        });
      });
    });
  });
};

// Update education of an employee
exports.updateEducation = (req, res) => {
  Joi.validate(req.body, EducationValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedEducation = {
      SchoolUniversity: req.body.SchoolUniversity,
      Degree: req.body.Degree,
      Grade: req.body.Grade,
      PassingOfYear: req.body.PassingOfYear,
    };

    Education.findByIdAndUpdate(
      req.params.id,
      updatedEducation,
      { new: true },
      err => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error updating education');
        }
        res.send(updatedEducation);
        console.log('Updated education:', updatedEducation);
      }
    );
  });
};

// Delete education of an employee
exports.deleteEducation = (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error finding employee');
    }

    Education.findByIdAndRemove(req.params.id2, (err, education) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting education');
      }

      Employee.updateOne(
        { _id: req.params.id },
        { $pull: { education: req.params.id2 } },
        err => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send("Error updating employee's education array");
          }
          res.send(education);
          console.log('Education deleted:', education);
        }
      );
    });
  });
};
