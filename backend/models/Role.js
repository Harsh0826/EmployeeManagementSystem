const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection); 
// Role Schema
const roleSchema = new mongoose.Schema({
  RoleName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
});
roleSchema.plugin(autoIncrement.plugin, {
  model: 'Role',
  field: 'RoleID',
});

const Role = mongoose.model('Role', roleSchema);

// Role Validation
const RoleValidation = Joi.object({
  RoleName: Joi.string().max(200).required(),
  CompanyID: Joi.string().required(),
});
module.exports = {
  Role,
  RoleValidation,
};
