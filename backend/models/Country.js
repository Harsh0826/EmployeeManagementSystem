const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
var countrySchema = new mongoose.Schema({
  CountryName: { type: String, required: true },
  states: [{ type: mongoose.Schema.Types.ObjectId, ref: 'State' }],
});
countrySchema.plugin(autoIncrement.plugin, {
  model: 'Country',
  field: 'CountryID',
});
var Country = mongoose.model('Country', countrySchema);

const CountryValidation = Joi.object().keys({
  _id: Joi.optional(),
  CountryID: Joi.optional(),
  CountryName: Joi.string().max(200).required(),
});
module.exports = { countrySchema, CountryValidation };
