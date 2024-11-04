const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
// Family Info Schema
const familyInfoSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Relationship: { type: String, required: true },
  DOB: { type: Date, required: true },
  Occupation: { type: String, required: true },
});
familyInfoSchema.plugin(autoIncrement.plugin, {
  model: 'FamilyInfo',
  field: 'FamilyInfoID',
});

const FamilyInfo = mongoose.model('FamilyInfo', familyInfoSchema);

// Family Info Validation
const FamilyInfoValidation = Joi.object({
  Name: Joi.string().max(200).required(),
  Relationship: Joi.string().max(200).required(),
  DOB: Joi.date().required(),
  Occupation: Joi.string().max(100).required(),
});
module.exports = {
  FamilyInfo,
  FamilyInfoValidation,
};
