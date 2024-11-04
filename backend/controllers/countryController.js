const Joi = require('joi');
const Country = require('../models/Country');
const State = require('../models/State'); // Import State model
const City = require('../models/City'); // Import City model

// Get all countries
exports.getCountries = (req, res) => {
  Country.find()
    .populate({ path: 'states', populate: { path: 'cities' } })
    .exec((err, countries) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching countries');
      }
      res.send(countries);
    });
};

// Create a new country
exports.createCountry = (req, res) => {
  Joi.validate(req.body, CountryValidation, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const newCountry = {
      CountryName: req.body.CountryName,
    };

    Country.create(newCountry, (err, country) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error creating country');
      }
      res.send(country);
      console.log('New country saved');
    });
  });
};

// Update an existing country
exports.updateCountry = (req, res) => {
  Joi.validate(req.body, CountryValidation, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedCountry = {
      CountryName: req.body.CountryName,
    };

    Country.findByIdAndUpdate(
      req.params.id,
      updatedCountry,
      { new: true },
      (err, country) => {
        if (err) {
          return res.status(500).send('Error updating country');
        }
        res.send(updatedCountry);
      }
    );
  });
};

// Delete a country
exports.deleteCountry = (req, res) => {
  Country.findById(req.params.id, (err, foundCountry) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!foundCountry || foundCountry.states.length > 0) {
      return res
        .status(403)
        .send(
          'First delete all the states in this country before deleting this country'
        );
    }

    Country.findByIdAndRemove(req.params.id, (err, country) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting country');
      }

      // Delete associated states
      State.deleteMany({ country: { _id: req.params.id } }, err => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error deleting states');
        }

        // Delete associated cities
        City.deleteMany({ state: { country: { _id: req.params.id } } }, err => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error deleting cities');
          }
          console.log('Country deleted');
          res.send(country);
        });
      });
    });
  });
};
