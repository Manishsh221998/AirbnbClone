const express = require("express");
const dashboardController = require("../controller/Dashboard/dashboardController");
const registerController = require("../controller/Pages/authentication/registerController");
const {
  forgotPassword,
} = require("../controller/Pages/authentication/forgotPassword_Controller");
const forgotPassword_Controller = require("../controller/Pages/authentication/forgotPassword_Controller");
const errorController = require("../controller/Pages/error/errorController");
const blankPageController = require("../controller/Pages/blankPage/blankPageController");
const tableController = require("../controller/tableController");
const AdminImage = require("../helper/AdminImage");
const AdminCheck = require("../middleware/AdminCheck");
const PropertyController = require("../controller/PropertyController");
const mutileImages = require("../helper/MultipleImages.Property");

const router = express.Router();

//dashboard
router.get(
  "/",
  AdminCheck,
  registerController.CheckAuth,
  dashboardController.dashboard
);

//admin-authnetication
router.get("/login", registerController.login);
router.post("/login/create", registerController.loginCreate);
router.get("/register", registerController.register);
router.post(
  "/register/create",
  AdminImage.single("image"),
  registerController.registerCreate
);
router.get("/forgotPassword", forgotPassword_Controller.forgotPassword);
router.get("/logout", AdminCheck, registerController.logout);

// Property Compoenents
router.get("/add-property", PropertyController.propertyView);
router.post(
  "/create-property",
  mutileImages,
  PropertyController.createProperty
);
router.post(
  "/update-property/:id",
  mutileImages,
  PropertyController.updateProperty
);
router.get("/inventoryTable", PropertyController.propertyTableView);
router.get("/inventoryTable/edit/:id", PropertyController.edit);
router.get("/inventoryTable/delete/:id", PropertyController.delete);
// View Single Property
router.get("/inventoryTable/view/:id", PropertyController.singleProperty);

//error page
router.get("/error", errorController.error);
//blank page
router.get("/blank", blankPageController.blankPage);
//table
router.get("/table", tableController.table);

module.exports = router;
