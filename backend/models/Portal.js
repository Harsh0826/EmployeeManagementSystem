const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection); 
// Portal Schema
const portalSchema = new mongoose.Schema({
  CreatedBy: { type: String },
  CreatedDate: { type: Date, default: Date.now },
  Deleted: { type: Boolean, default: false },
  ModifiedBy: { type: String },
  ModifiedDate: { type: Date },
  PortalName: { type: String, required: true },
  Status: { type: Number, required: true },
});
portalSchema.plugin(autoIncrement.plugin, {
  model: 'Portal',
  field: 'ID',
});

const Portal = mongoose.model('Portal', portalSchema);

// Portal Validation
const PortalValidation = Joi.object({
  CreatedBy: Joi.string().optional(),
  CreatedDate: Joi.date().optional(),
  Deleted: Joi.boolean().optional(),
  ModifiedBy: Joi.string().optional(),
  ModifiedDate: Joi.date().optional(),
  PortalName: Joi.string().max(200).required(),
  Status: Joi.number().required(),
});
module.exports = {
  Portal,
  PortalValidation,
};
