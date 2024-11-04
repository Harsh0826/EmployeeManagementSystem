const express = require("express");
const portalController = require("../controllers/portalController");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = express.Router();

router.get("/", verifyAdmin, portalController.getPortals);
router.post("/", verifyAdmin, portalController.createPortal);
router.put("/:id", verifyAdmin, portalController.updatePortal);
router.delete("/:id", verifyAdmin, portalController.deletePortal);

module.exports = router;
