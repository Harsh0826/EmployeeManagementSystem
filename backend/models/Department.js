const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
// Department Schema
const departmentSchema = new mongoose.Schema({
  DepartmentName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
});
departmentSchema.plugin(autoIncrement.plugin, {
  model: 'Department',
  field: 'DepartmentID',
});

const Department = mongoose.model('Department', departmentSchema);

// Department Validation
const DepartmentValidation = Joi.object({
  DepartmentName: Joi.string().max(200).required(),
  CompanyID: Joi.string().required(),
});
module.exports = {
  Department,
  DepartmentValidation,
};
