const express = require('express');
const projectController = require('../controllers/projectController');
const verifyAdmin = require('../middlewares/verifyAdmin');

const router = express.Router();

router.get('/', verifyAdmin, projectController.getProjects);
router.post('/', verifyAdmin, projectController.createProject);
router.put('/:id', verifyAdmin, projectController.updateProject);
router.delete('/:id', verifyAdmin, projectController.deleteProject);

module.exports = router;
    