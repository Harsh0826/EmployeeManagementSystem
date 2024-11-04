const express = require("express");
const departmentController = require("../controllers/departmentController");
const verifyAdminHR = require("../middlewares/verifyAdminHR");
const router = express.Router();

router.get("/", verifyAdminHR, departmentController.getDepartments);
router.post("/", verifyAdminHR, departmentController.createDepartment);
router.put("/:id", verifyAdminHR, departmentController.updateDepartment);
router.delete("/:id", verifyAdminHR, departmentController.deleteDepartment);

module.exports = router;
