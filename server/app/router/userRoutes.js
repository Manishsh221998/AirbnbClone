const express = require("express");
const AuthCheck = require("../middleware/authCheckFunction");
const UserController = require("../controller/UserController");
const BookingController = require("../controller/BookingController");
const UserImage = require("../helper/UserImage");
const router = express.Router();

router.post("/user-register",UserImage.single('image'),UserController.register);
router.post("/otp-verify", UserController.verify);
router.post("/user-login", UserController.login);
router.post("/reset-password-link", UserController.resetPasswordLink);
router.post("/reset-password/:id/:token",UserController.resetPassword);

 
// router.post("/booking",BookingController.bookingData)
router.use(AuthCheck)
 router.get("/profile",UserController.profile);
 router.post("/update-password",UserController.updatePassword);
 router.put("/change-profilePic",UserImage.single('image'),UserController.changeProfilePic);
 //  Booking

module.exports = router;
