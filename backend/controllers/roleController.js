const Joi = require('joi');
const Role = require('../models/Role');

exports.getRoles = (req, res) => {
  Role.find()
    .populate('company')
    .exec((err, roles) => {
      if (err) return res.status(500).send('Error fetching roles');
      res.send(roles);
    });
};

exports.createRole = (req, res) => {
  Joi.validate(req.body, RoleValidation, (err, result) => {
    if (err) return res.status(400).send(err.details[0].message);

    const newRole = {
      RoleName: req.body.RoleName,
      company: req.body.CompanyID,
    };
    Role.create(newRole, (err, role) => {
      if (err) return res.status(500).send('Error creating role');
      res.send(role);
    });
  });
};

exports.updateRole = (req, res) => {
  Joi.validate(req.body, RoleValidation, (err, result) => {
    if (err) return res.status(400).send(err.details[0].message);

    const updateRole = {
      RoleName: req.body.RoleName,
      company: req.body.CompanyID,
    };
    Role.findByIdAndUpdate(req.params.id, updateRole, (err, role) => {
      if (err) return res.status(500).send('Error updating role');
      res.send(updateRole);
    });
  });
};

exports.deleteRole = (req, res) => {
  Employee.find({ role: req.params.id }, (err, employees) => {
    if (err) return res.status(500).send('Error finding employees');

    if (employees.length > 0) {
      return res
        .status(403)
        .send('Role associated with Employee, cannot delete');
    }

    Role.findByIdAndRemove(req.params.id, (err, role) => {
      if (err) return res.status(500).send('Error deleting role');
      res.send(role);
    });
  });
};
