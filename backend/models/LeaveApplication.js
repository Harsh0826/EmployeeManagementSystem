const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Joi = require('joi'); // Ensure you have Joi required

// Initialize autoIncrement with Mongoose connection
autoIncrement.initialize(mongoose.connection);
const leaveApplicationSchema = new mongoose.Schema({
  Leavetype: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
  Reasonforleave: { type: String, required: true },
  Status: { type: String, required: true },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
});
leaveApplicationSchema.plugin(autoIncrement.plugin, {
  model: 'LeaveApplication',
  field: 'LeaveApplicationID',
});

const LeaveApplication = mongoose.model(
  'LeaveApplication',
  leaveApplicationSchema
);

// Leave Application Validation
const LeaveApplicationValidation = Joi.object({
  Leavetype: Joi.string().max(100).required(),
  FromDate: Joi.date().required(),
  ToDate: Joi.date().required(),
  Reasonforleave: Joi.string().max(100).required(),
  Status: Joi.number().max(1).required(),
});
const LeaveApplicationHRValidation = Joi.object().keys({
  Status: Joi.number().max(3).required(),
});
module.exports = {
  LeaveApplication,
  LeaveApplicationValidation,
  LeaveApplicationHRValidation,
};
