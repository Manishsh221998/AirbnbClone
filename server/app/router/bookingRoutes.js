const express = require('express');
const BookingController = require('../controller/BookingController');
// const AuthCheck = require('../middleware/authCheckFunction');
const router = express.Router();


router.post('/booking/create', BookingController.bookingData);
router.get('/booking/get', BookingController.getBookings);
router.get('/show-client-bookings', BookingController.showBookings);


module.exports = router;