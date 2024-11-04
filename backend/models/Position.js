const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection); 
// Position Schema
const positionSchema = new mongoose.Schema({
  PositionName: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
});
positionSchema.plugin(autoIncrement.plugin, {
  model: 'Position',
  field: 'PositionID',
});

const Position = mongoose.model('Position', positionSchema);

// Position Validation
const PositionValidation = Joi.object({
  PositionName: Joi.string().max(200).required(),
  CompanyID: Joi.string().required(),
});
module.exports = {
  Position,
  PositionValidation,
};
