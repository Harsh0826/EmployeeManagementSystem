const express = require('express');
const cityController = require('../controllers/cityController');
const verifyHR = require('../middlewares/verifyHR');

const router = express.Router();

router.get('/', verifyHR, cityController.getCities);
router.post('/', verifyHR, cityController.createCity);
router.put('/:id', verifyHR, cityController.updateCity);
router.delete('/:id', verifyHR, cityController.deleteCity);

module.exports = router;
