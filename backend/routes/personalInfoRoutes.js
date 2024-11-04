const express = require('express');
const personalInfoController = require('../controllers/personalInfoController');
const verifyHREmployee = require('../middlewares/verifyHREmployee');
const verifyEmployee = require('../middlewares/verifyEmployee');

const router = express.Router();

router.get('/:id', verifyHREmployee, personalInfoController.getPersonalInfo);
router.put('/:id', verifyEmployee, personalInfoController.updatePersonalInfo);

module.exports = router;
