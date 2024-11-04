const express = require('express');
const leaveApplicationHRController = require('../controllers/leaveApplicationHRController');
const verifyHR = require('../middlewares/verifyHR');

const router = express.Router();

router.get('/', verifyHR, leaveApplicationHRController.getLeaveApplications);
router.put(
  '/:id',
  verifyHR,
  leaveApplicationHRController.updateLeaveApplication
);
router.delete(
  '/:id/:id2',
  verifyHR,
  leaveApplicationHRController.deleteLeaveApplication
);

module.exports = router;
