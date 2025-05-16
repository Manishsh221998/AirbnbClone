
const nodemailer = require("nodemailer");
const transporter = require("../config/emailConfig");

const sendBookingMail = async (userName) => {

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Booking Confirmation",
    html: `
      <h2>Dear ${userName}!</h2>
      <p>Your Booking has been completed!</p>
      <p>Thank you for visiting our site</p>
      <p> Welcome Again</p>
    `,
  });
};

module.exports = { sendBookingMail };
