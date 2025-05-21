
const sendBookingMail = require('../helper/bookingEmail');
const Booking = require('../model/booking');
const UserModel = require('../model/user');

class BookingController {
  // =========== POST ==================
  async bookingData(req, res) {
    try {
      // const user=req.body.userName;
      const { check_in, check_out, guests,totalPrice,userId,title,userName,userPhone} = req.body;
      const user=await UserModel.findById(userId)
 
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
        userName,
        userPhone
      });
      

      const bookedData= await BookingData.save();
      const Booking_ID=bookedData._id.toString().slice(-6).toUpperCase()
       
      await sendBookingMail(bookedData,user.email,Booking_ID);
      return res.status(201).json({
        status: true,
        message: "Booking successfully",
        data: bookedData,
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
  // =========== Get Bookings for admin ====================

async showBookings(req, res) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }); // Sort by newest first
    res.render('bookings', { 
              title: req.cookies.adminName,
 role: req.cookies.adminRole,
        adminName: req.cookies.adminName,
        image: req.cookies.adminImg,
       bookings,
      formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
    });
  } catch (err) {
    console.log(err);
    res.render('error', { error: 'Failed to load bookings' });
  }
}
}

module.exports = new BookingController();
