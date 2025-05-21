 const Property=require('../../model/property')
 const Booking=require('../../model/booking')
 const Admin=require('../../model/admin')
 const User=require('../../model/user')
class Dashboard_Controller {
  async dashboard(req, res) {
    const proprtyData=await Property.find()
    const bookingData=await Booking.find()
    const adminData=await Admin.find()
    const userData=await User.find()
     try {

      res.render("dashboard.ejs", {
        title: req.cookies.adminName,
        role:req.cookies.adminRole,
        image:req.cookies.adminImg,
        proprtyCount:proprtyData.length,
        bookingCount:bookingData.length,
        adminCount:adminData.length,
        userCount:userData.length,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Dashboard_Controller();
