const express = require('express');
const leaveApplicationEmpController = require('../controllers/leaveApplicationEmpController');
const verifyEmployee = require('../middlewares/verifyEmployee');

const router = express.Router();

router.get(
  '/:id',
  verifyEmployee,
  leaveApplicationEmpController.getLeaveApplications
);
router.post(
  '/:id',
  verifyEmployee,
  leaveApplicationEmpController.addLeaveApplication
);
router.put(
  '/:id',
  verifyEmployee,
  leaveApplicationEmpController.updateLeaveApplication
);
router.delete(
  '/:id/:id2',
  verifyEmployee,
  leaveApplicationEmpController.deleteLeaveApplication
);

module.exports = router;
