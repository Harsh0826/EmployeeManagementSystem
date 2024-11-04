const express = require('express');
const salaryController = require('../controllers/salaryController');
const verifyHR = require('../middlewares/verifyHR');

const router = express.Router();

router.get('/', verifyHR, salaryController.getSalaries);
router.post('/:id', verifyHR, salaryController.createSalary);
router.put('/:id', verifyHR, salaryController.updateSalary);
router.delete('/:id', verifyHR, salaryController.deleteSalary);

module.exports = router;
