const Joi = require("joi");
const Position = require("../models/Position");
const Employee = require("../models/Employee");

exports.getPositions = (req, res) => {
  Position.find()
    .populate("company")
    .exec((err, positions) => {
      if (err) return res.status(500).send("Error fetching positions");
      res.send(positions);
    });
};

exports.createPosition = (req, res) => {
  Joi.validate(req.body, PositionValidation, (err, result) => {
    if (err) return res.status(400).send(err.details[0].message);

    const newPosition = { PositionName: req.body.PositionName, company: req.body.CompanyID };
    Position.create(newPosition, (err, position) => {
      if (err) return res.status(500).send("Error creating position");
      res.send(position);
    });
  });
};

exports.updatePosition = (req, res) => {
  Joi.validate(req.body, PositionValidation, (err, result) => {
    if (err) return res.status(400).send(err.details[0].message);

    const updatePosition = { PositionName: req.body.PositionName, company: req.body.CompanyID };
    Position.findByIdAndUpdate(req.params.id, updatePosition, (err, position) => {
      if (err) return res.status(500).send("Error updating position");
      res.send(updatePosition);
    });
  });
};

exports.deletePosition = (req, res) => {
  Employee.find({ position: req.params.id }, (err, employees) => {
    if (err) return res.status(500).send("Error finding employees");

    if (employees.length > 0) {
      return res.status(403).send("Position associated with employees, cannot delete");
    }

    Position.findByIdAndRemove(req.params.id, (err, position) => {
      if (err) return res.status(500).send("Error deleting position");
      res.send(position);
    });
  });
};
