const express = require('express');
const stateController = require('../controllers/stateController');
const verifyHR = require('../middlewares/verifyHR');

const router = express.Router();

router.get('/', verifyHR, stateController.getStates);
router.post('/', verifyHR, stateController.createState);
router.put('/:id', verifyHR, stateController.updateState);
router.delete('/:id', verifyHR, stateController.deleteState);

module.exports = router;
