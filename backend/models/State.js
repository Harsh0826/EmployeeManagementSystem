const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
var stateSchema = new mongoose.Schema({
  StateName: { type: String, required: true },
  country: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
});
stateSchema.plugin(autoIncrement.plugin, {
  model: 'State',
  field: 'StateID',
});
var State = mongoose.model('State', stateSchema);

const StateValidation = Joi.object().keys({
  _id: Joi.optional(),
  CountryID: Joi.optional(),
  StateName: Joi.string().max(200).required(),
});
module.exports = { stateSchema, StateValidation };
