
const nodemailer = require("nodemailer");
const transporter = require("../config/emailConfig");

const sendBookingMail = async (name) => {

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Booking Confirmation",
    html: `
      <h2>Dear ${name}!</h2>
      <p>Your Booking has been completed!</p>
    //   <p>Thank you & Welcome Again</p>
    `,
  });
};

module.exports = { sendBookingMail };
