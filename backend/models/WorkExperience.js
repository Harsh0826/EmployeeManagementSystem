const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
// Work Experience Schema
const workExperienceSchema = new mongoose.Schema({
  CompanyName: { type: String, required: true },
  Designation: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
});
workExperienceSchema.plugin(autoIncrement.plugin, {
  model: 'WorkExperience',
  field: 'WorkExperienceID',
});

const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

// Work Experience Validation
const WorkExperienceValidation = Joi.object({
  CompanyName: Joi.string().max(200).required(),
  Designation: Joi.string().max(200).required(),
  FromDate: Joi.date().required(),
  ToDate: Joi.date().required(),
});
module.exports = {
  WorkExperience,
  WorkExperienceValidation,
};
