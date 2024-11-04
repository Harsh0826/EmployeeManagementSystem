const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
var citySchema = new mongoose.Schema({
  CityName: { type: String, required: true },
  state: [{ type: mongoose.Schema.Types.ObjectId, ref: 'State' }],
});
citySchema.plugin(autoIncrement.plugin, {
  model: 'City',
  field: 'CityID',
});
var City = mongoose.model('City', citySchema);

const CityValidation = Joi.object().keys({
  _id: Joi.optional(),
  StateID: Joi.optional(),
  CityName: Joi.string().max(200).required(),
});
module.exports = { citySchema, CityValidation };
