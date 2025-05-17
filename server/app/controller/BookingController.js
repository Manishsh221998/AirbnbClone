
const { sendBookingMail } = require('../helper/bookingEmail');
const Booking = require('../model/booking');

class BookingController {
  // =========== POST ==================
  async bookingData(req, res) {
    try {
      // const user=req.body.userName;
      const { check_in, check_out, guests,totalPrice,userId,title,userName } = req.body;

      if (!(check_in && check_out && guests)) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }

      const BookingData = new Booking({
        check_in,
        check_out,
        guests,
        totalPrice,
        userId,
        title,
        userName
      });

      const booked = await BookingData.save();
      // await sendBookingMail(userName);
      return res.status(201).json({
        status: true,
        message: "Booking successfully",
        data: booked,
      });

    } catch (error) {
      console.log("error:", error);
      res.status(500).json({ status: false, message: "Server error" });
    }
  }
  // =========== Get ====================
  async getBookings (req, res) {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

}

module.exports = new BookingController();
