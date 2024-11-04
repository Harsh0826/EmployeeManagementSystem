const express = require('express');
const workExperienceController = require('../controllers/workExperienceController');
const verifyHREmployee = require('../middlewares/verifyHREmployee');
const verifyEmployee = require('../middlewares/verifyEmployee');

const router = express.Router();

router.get(
  '/:id',
  verifyHREmployee,
  workExperienceController.getWorkExperience
);
router.post('/:id', verifyEmployee, workExperienceController.addWorkExperience);
router.put(
  '/:id',
  verifyEmployee,
  workExperienceController.updateWorkExperience
);
router.delete(
  '/:id/:id2',
  verifyEmployee,
  workExperienceController.deleteWorkExperience
);

module.exports = router;
