const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
// Education Schema

const educationSchema = new mongoose.Schema({
  SchoolUniversity: { type: String, required: true },
  Degree: { type: String, required: true },
  Grade: { type: String, required: true },
  PassingOfYear: { type: String, required: true },
});
educationSchema.plugin(autoIncrement.plugin, {
  model: 'Education',
  field: 'EducationID',
});

const Education = mongoose.model('Education', educationSchema);

// Education Validation
const EducationValidation = Joi.object({
  SchoolUniversity: Joi.string().max(200).required(),
  Degree: Joi.string().max(200).required(),
  Grade: Joi.string().max(50).required(),
  PassingOfYear: Joi.string().max(10).required(),
});
module.exports = {
  Education,
  EducationValidation,
};
