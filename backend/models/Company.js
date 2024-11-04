const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
const companySchema = new mongoose.Schema({
  CompanyName: { type: String, required: true },
  Address: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  ContactNo: { type: String, required: true },
  CreatedBy: { type: String },
  CreatedDate: { type: Date, default: Date.now },
  ModifiedBy: { type: String },
  ModifiedDate: { type: Date },
});
companySchema.plugin(autoIncrement.plugin, {
  model: 'Company',
  field: 'CompanyID',
});

const Company = mongoose.model('Company', companySchema);

// Company Validation
const CompanyValidation = Joi.object({
  CompanyName: Joi.string().max(200).required(),
  Address: Joi.string().max(200).required(),
  Email: Joi.string().email().required(),
  ContactNo: Joi.string().max(20).required(),
});
module.exports = {
  Company,
  CompanyValidation,
};
