const express = require('express');
const educationController = require('../controllers/educationController');
const verifyHREmployee = require('../middlewares/verifyHREmployee');
const verifyEmployee = require('../middlewares/verifyEmployee');

const router = express.Router();

router.get('/:id', verifyHREmployee, educationController.getEducation);
router.post('/:id', verifyEmployee, educationController.addEducation);
router.put('/:id', verifyEmployee, educationController.updateEducation);
router.delete('/:id/:id2', verifyEmployee, educationController.deleteEducation);

module.exports = router;
