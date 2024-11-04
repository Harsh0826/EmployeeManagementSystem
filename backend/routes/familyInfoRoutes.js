const express = require('express');
const familyInfoController = require('../controllers/familyInfoController');
const verifyHREmployee = require('../middlewares/verifyHREmployee');
const verifyEmployee = require('../middlewares/verifyEmployee');

const router = express.Router();

router.get('/:id', verifyHREmployee, familyInfoController.getFamilyInfo);
router.post('/:id', verifyEmployee, familyInfoController.addFamilyInfo);
router.put('/:id', verifyEmployee, familyInfoController.updateFamilyInfo);
router.delete(
  '/:id/:id2',
  verifyEmployee,
  familyInfoController.deleteFamilyInfo
);

module.exports = router;
