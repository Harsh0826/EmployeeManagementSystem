const Joi = require('joi');
const Employee = require('../models/Employee');
const { FamilyInfo, FamilyInfoValidation } = require('../models/FamilyInfo');

// Get family information of an employee
exports.getFamilyInfo = (req, res) => {
  console.log('Fetching family info for employee ID:', req.params.id);
  Employee.findById(req.params.id)
    .populate('familyInfo')
    .select('FirstName LastName MiddleName')
    .exec((err, employee) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching employee family info');
      }
      res.send(employee);
    });
};

// Add family information for an employee
exports.addFamilyInfo = (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    Employee.findById(req.params.id, (err, employee) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error finding employee');
      }

      const newFamilyInfo = {
        Name: req.body.Name,
        Relationship: req.body.Relationship,
        DOB: req.body.DOB,
        Occupation: req.body.Occupation,
      };

      FamilyInfo.create(newFamilyInfo, (err, familyInfo) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error creating family info');
        }

        employee.familyInfo.push(familyInfo);
        employee.save(err => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error saving employee');
          }
          res.send(familyInfo);
          console.log('New family info saved:', familyInfo);
        });
      });
    });
  });
};

// Update family information of an employee
exports.updateFamilyInfo = (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedFamilyInfo = {
      Name: req.body.Name,
      Relationship: req.body.Relationship,
      DOB: req.body.DOB,
      Occupation: req.body.Occupation,
    };

    FamilyInfo.findByIdAndUpdate(
      req.params.id,
      updatedFamilyInfo,
      { new: true },
      err => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error updating family info');
        }
        res.send(updatedFamilyInfo);
        console.log('Updated family info:', updatedFamilyInfo);
      }
    );
  });
};

// Delete family information of an employee
exports.deleteFamilyInfo = (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error finding employee');
    }

    FamilyInfo.findByIdAndRemove(req.params.id2, (err, familyInfo) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting family info');
      }

      Employee.updateOne(
        { _id: req.params.id },
        { $pull: { familyInfo: req.params.id2 } },
        err => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send("Error updating employee's family info array");
          }
          res.send(familyInfo);
          console.log('Family info deleted:', familyInfo);
        }
      );
    });
  });
};
