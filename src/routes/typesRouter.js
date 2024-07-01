const express = require("express");
const typesController = require("../controllers/typesController");

const router = express.Router();

router.post("/create", typesController.createType);
router.delete("/delete/:id", typesController.deleteType);

module.exports = router;
