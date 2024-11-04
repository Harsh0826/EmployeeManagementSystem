const Joi = require('joi');
const Employee = require('../models/Employee');
const jwtKey = require('../config/jwtKey').jwtKey;
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const schema = Joi.object({
    email: Joi.string().max(200).required(),
    password: Joi.string().max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  Employee.findOne(
    { Email: req.body.email },
    'Password _id Account FirstName LastName',
    (err, document) => {
      if (err || document == null) {
        return res.send('false');
      }

      if (document.Password === req.body.password) {
        const emp = {
          _id: document._id,
          Account: document.Account,
          FirstName: document.FirstName,
          LastName: document.LastName,
        };
        const token = jwt.sign(emp, jwtKey);
        res.send(token);
      } else {
        res.sendStatus(400);
      }
    }
  );
};
