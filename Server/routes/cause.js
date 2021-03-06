const express = require("express");
const verifyToken = require("../middleware/verifytoken");
const causeController = require("../controllers/causeController");
const router = express.Router();
router.post("/", verifyToken, causeController.createCause);
router.get("/", causeController.getAllCause);
router.get("/:causeId", causeController.getSingleCause);
router.patch("/:causeId", verifyToken, causeController.updateCause);
router.delete("/:causeId", verifyToken, causeController.deleteCause);
module.exports = router;
