const express = require("express");
const positionController = require("../controllers/positionController");
const verifyAdminHR = require("../middlewares/verifyAdminHR");
const router = express.Router();

router.get("/", verifyAdminHR, positionController.getPositions);
router.post("/", verifyAdminHR, positionController.createPosition);
router.put("/:id", verifyAdminHR, positionController.updatePosition);
router.delete("/:id", verifyAdminHR, positionController.deletePosition);

module.exports = router;
