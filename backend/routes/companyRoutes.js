const express = require('express');
const companyController = require('../controllers/companyController');
const verifyAdminHR = require('../middlewares/verifyAdminHR');
const verifyHR = require('../middlewares/verifyHR');

const router = express.Router();

router.get('/', verifyAdminHR, companyController.getCompanies);
router.post('/', verifyHR, companyController.createCompany);
router.put('/:id', verifyHR, companyController.updateCompany);

module.exports = router;
