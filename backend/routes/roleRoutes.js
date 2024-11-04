const express = require('express');
const roleController = require('../controllers/roleController');
const verifyAdminHR = require('../middlewares/verifyAdminHR.js');
const router = express.Router();

router.get('/', verifyAdminHR, roleController.getRoles);
router.post('/', verifyAdminHR, roleController.createRole);
router.put('/:id', verifyAdminHR, roleController.updateRole);
router.delete('/:id', verifyAdminHR, roleController.deleteRole);

module.exports = router;
