const Joi = require('joi');
const { State, StateValidation } = require('../models/State');
const Country = require('../models/Country');
const City = require('../models/City');

// Get all states
exports.getStates = (req, res) => {
  State.find()
    .populate('country cities')
    .exec((err, states) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching states');
      }
      res.send(states);
    });
};

// Create a new state
exports.createState = (req, res) => {
  Joi.validate(req.body, StateValidation, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const newState = {
      StateName: req.body.StateName,
      country: req.body.CountryID,
    };

    State.create(newState, (err, state) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error creating state');
      }

      Country.findById(req.body.CountryID, (err, country) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error fetching country');
        }
        country.states.push(state);
        country.save((err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error saving country');
          }
          console.log(data);
          res.send(state);
        });
      });
      console.log('New state saved');
    });
  });
};

// Update an existing state
exports.updateState = (req, res) => {
  Joi.validate(req.body, StateValidation, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updatedState = {
      StateName: req.body.StateName,
      country: req.body.CountryID,
    };

    State.findByIdAndUpdate(
      req.params.id,
      updatedState,
      { new: true },
      (err, state) => {
        if (err) {
          return res.status(500).send('Error updating state');
        }
        res.send(updatedState);
      }
    );
  });
};

// Delete a state
exports.deleteState = (req, res) => {
  State.findById(req.params.id, (err, foundState) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (foundState.cities.length > 0) {
      return res
        .status(403)
        .send(
          'First delete all the cities in this state before deleting this state'
        );
    }

    State.findByIdAndRemove(req.params.id, (err, state) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting state');
      }

      Country.updateOne(
        { _id: state.country },
        { $pull: { states: state._id } },
        (err, numberAffected) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Error updating country');
          }
          console.log(numberAffected);
          res.send(state);
        }
      );
    });
  });
};
