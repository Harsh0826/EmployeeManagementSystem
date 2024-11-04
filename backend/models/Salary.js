const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
const salarySchema = new mongoose.Schema({
  BasicSalary: { type: String, required: true },
  BankName: { type: String, required: true },
  AccountNo: { type: String, required: true },
  AccountHolderName: { type: String, required: true },
  IFSCcode: { type: String, required: true },
  TaxDeduction: { type: String, required: true },
});
salarySchema.plugin(autoIncrement.plugin, {
  model: 'Salary',
  field: 'SalaryID',
});

const Salary = mongoose.model('Salary', salarySchema);

// Salary Validation
const SalaryValidation = Joi.object({
  BasicSalary: Joi.string().max(20).required(),
  BankName: Joi.string().max(200).required(),
  AccountNo: Joi.string().max(200).required(),
  AccountHolderName: Joi.string().max(200).required(),
  IFSCcode: Joi.string().max(200).required(),
  TaxDeduction: Joi.string().max(100).required(),
});
module.exports = {
  Salary,
  SalaryValidation,
};
