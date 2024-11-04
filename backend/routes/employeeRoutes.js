const express = require('express');
const employeeController = require('../controllers/employeeController');
const verifyHR = require('../middlewares/verifyHR');

const router = express.Router();

router.get('/', verifyHR, employeeController.getEmployees);
router.post('/', verifyHR, employeeController.createEmployee);
router.put('/:id', verifyHR, employeeController.updateEmployee);
router.delete('/:id', verifyHR, employeeController.deleteEmployee);

module.exports = router;
