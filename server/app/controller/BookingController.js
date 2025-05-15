
const Booking = require('../model/booking');

class BookingController {
  // =========== POST ==================
  async bookingData(req, res) {
    try {
      const { check_in, check_out, guests } = req.body;

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
      });

      const booked = await BookingData.save();

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
}

module.exports = new BookingController();
