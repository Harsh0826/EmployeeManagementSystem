const Joi = require('joi');
const { Company, CompanyValidation } = require('../models/Company');

// Get all companies
exports.getCompanies = (req, res) => {
  Company.find()
    .populate({
      path: 'city',
      populate: {
        path: 'state',
        model: 'State',
        populate: {
          path: 'country',
          model: 'Country',
        },
      },
    })
    .exec((err, companies) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching companies');
      }
      res.send(companies);
    });
};

// Create a new company
exports.createCompany = (req, res) => {
  Joi.validate(req.body, CompanyValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const newCompany = {
      CompanyName: req.body.CompanyName,
      Address: req.body.Address,
      city: req.body.CityID,
      PostalCode: req.body.PostalCode,
      Website: req.body.Website,
      Email: req.body.Email,
      ContactPerson: req.body.ContactPerson,
      ContactNo: req.body.ContactNo,
      FaxNo: req.body.FaxNo,
      PanNo: req.body.PanNo,
      GSTNo: req.body.GSTNo,
      CINNo: req.body.CINNo,
    };

    Company.create(newCompany, (err, company) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error creating company');
      }
      res.send(company);
      console.log('New company saved');
    });
  });
};

// Update an existing company
exports.updateCompany = (req, res) => {
  Joi.validate(req.body, CompanyValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedCompany = {
      CompanyName: req.body.CompanyName,
      Address: req.body.Address,
      city: req.body.CityID,
      PostalCode: req.body.PostalCode,
      Website: req.body.Website,
      Email: req.body.Email,
      ContactPerson: req.body.ContactPerson,
      ContactNo: req.body.ContactNo,
      FaxNo: req.body.FaxNo,
      PanNo: req.body.PanNo,
      GSTNo: req.body.GSTNo,
      CINNo: req.body.CINNo,
    };

    Company.findByIdAndUpdate(
      req.params.id,
      updatedCompany,
      { new: true },
      (err, company) => {
        if (err) {
          return res.status(500).send('Error updating company');
        }
        res.send(updatedCompany);
      }
    );
  });
};
