const Joi = require('joi');
const { City, CityValidation } = require('../models/City');
const State = require('../models/State');
const Company = require('../models/Company'); // Assuming you have a Company model

// Get all cities
exports.getCities = (req, res) => {
  City.find()
    .populate({ path: 'state', populate: { path: 'country' } })
    .exec((err, cities) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching cities');
      }
      res.send(cities);
    });
};

// Create a new city
exports.createCity = (req, res) => {
  Joi.validate(req.body, CityValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const newCity = {
      CityName: req.body.CityName,
      state: req.body.StateID,
    };

    City.create(newCity, (err, city) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error creating city');
      }

      State.findById(req.body.StateID, (err, state) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error fetching state');
        }

        state.cities.push(city);
        state.save((err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error saving state');
          }
          console.log(data);
          res.send(city);
        });
      });
      console.log('New city saved');
    });
  });
};

// Update an existing city
exports.updateCity = (req, res) => {
  Joi.validate(req.body, CityValidation, err => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedCity = {
      CityName: req.body.CityName,
      state: req.body.StateID,
    };

    City.findByIdAndUpdate(
      req.params.id,
      updatedCity,
      { new: true },
      (err, city) => {
        if (err) {
          return res.status(500).send('Error updating city');
        }
        res.send(updatedCity);
      }
    );
  });
};

// Delete a city
exports.deleteCity = (req, res) => {
  Company.find({ city: req.params.id }, (err, companies) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (companies.length > 0) {
      return res
        .status(403)
        .send(
          'This city is associated with a company, so you cannot delete it'
        );
    }

    City.findByIdAndRemove(req.params.id, (err, city) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting city');
      }

      State.updateOne(
        { _id: city.state },
        { $pull: { cities: city._id } },
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error updating state');
          }
          console.log(result);
          res.send(city);
        }
      );
    });
  });
};
