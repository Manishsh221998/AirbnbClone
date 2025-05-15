const express = require("express");
const ApiControllerProperty = require("../controller/apiControllerProperty/ApiControllerProperty");
const PropertyController = require("../controller/PropertyController");
const router = express.Router();

router.get("/property-list", ApiControllerProperty.getAllProperty);
router.get("/categorywise-list", ApiControllerProperty.getCategoryList);
router.get("/single-property/:id", PropertyController.getSingleProperty);

module.exports = router;
