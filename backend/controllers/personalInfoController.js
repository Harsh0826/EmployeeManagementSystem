const Joi = require('joi');
const {
  Employee,
  EmployeePersonalInfoValidation,
} = require('../models/Employee');

// Get personal information of an employee
exports.getPersonalInfo = (req, res) => {
  console.log('Fetching personal info for employee ID:', req.params.id);
  Employee.findById(req.params.id)
    .populate({
      path: 'role position department',
    })
    .select('-salary -education -familyInfo -workExperience')
    .exec((err, employee) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching employee');
      }
      res.send(employee);
    });
};

// Update personal information of an employee
exports.updatePersonalInfo = (req, res) => {
  Joi.validate(req.body, EmployeePersonalInfoValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedEmployeeInfo = {
      BloodGroup: req.body.BloodGroup,
      ContactNo: req.body.ContactNo,
      DOB: req.body.DOB,
      Email: req.body.Email,
      EmergencyContactNo: req.body.EmergencyContactNo,
      Gender: req.body.Gender,
      Hobbies: req.body.Hobbies,
      PANcardNo: req.body.PANcardNo,
      PermanetAddress: req.body.PermanetAddress,
      PresentAddress: req.body.PresentAddress,
    };

    Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updatedEmployeeInfo },
      { new: true },
      (err, employee) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error updating employee personal info');
        }
        res.send(updatedEmployeeInfo);
        console.log('Updated personal information:', updatedEmployeeInfo);
      }
    );
  });
};
