const transporter = require("../config/emailConfig");
const OtpModel = require("../model/otpModel");
const dotenv=require('dotenv')

dotenv.config()

const sendEmailVerificationOTP = async (req, user) => {
  // console.log(user)
    try {

    const otp = Math.floor(1000 + Math.random() * 9000);
    // console.log(otp);

    const data = await new OtpModel({ userId: user._id, otp: otp }).save();

    await transporter.sendMail({

      from: process.env.EMAIL_FROM, // sender address
      to: user?.email, // list of receivers or, single reciver
      subject: "OTP - Verify your account", // Subject line

      html: `<p>Dear, ${user?.username},</p>
        <hr/>
         <p>Thank you for signing up with our website. To complete your registration, please verify your email address by entering the following one-time password (OTP)</p>
         <h2>OTP: ${otp}</h2>
            <p>This OTP is valid for 15 minutes. If you didn't request this OTP, please ignore this email.</p>`, // html body
    });

    return otp;
  } 

  catch (error) {
    console.log("Error :sendEmailVerificationOTP", error);
  }

};

module.exports = sendEmailVerificationOTP;
