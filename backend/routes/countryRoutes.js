const express = require('express');
const countryController = require('../controllers/countryController');
const verifyHR = require('../middlewares/verifyHR');

const router = express.Router();

router.get('/', verifyHR, countryController.getCountries);
router.post('/', verifyHR, countryController.createCountry);
router.put('/:id', verifyHR, countryController.updateCountry);
router.delete('/:id', verifyHR, countryController.deleteCountry);

module.exports = router;
