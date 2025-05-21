const transporter = require("../config/emailConfig");
const OtpModel = require("../model/otpModel");
const dotenv = require('dotenv');

dotenv.config();

const sendEmailVerificationOTP = async (req, user) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    const data = await new OtpModel({ 
      userId: user._id, 
      otp: otp,
      expiresAt: expiresAt
    }).save();

    const emailTemplate = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
        <div style="background: #FF385C; padding: 20px; text-align: center;">
          <img src="https://your-cloudbnb-logo-url.com/logo.png" alt="CloudBnB Logo" style="max-height: 60px;">
          <h1 style="color: white; margin: 10px 0 0 0;">Email Verification</h1>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="margin-top: 0;">Hello ${user.username},</h2>
          
          <p>Thank you for creating an account with CloudBnB. To complete your registration and ensure the security of your account, please verify your email address using the following One-Time Password (OTP):</p>
          
          <div style="background: #f8f9fa; border-radius: 4px; padding: 15px; text-align: center; margin: 25px 0; font-size: 24px; letter-spacing: 2px; font-weight: bold;">
            ${otp}
          </div>
          
          <p>This verification code will expire in <strong>15 minutes</strong>. For your security, please do not share this code with anyone.</p>
          
          <p>If you didn't request this verification, please ignore this email or contact our support team if you have any concerns.</p>
          
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 25px 0;">
          
          <p style="font-size: 14px; color: #666;">
            <strong>Note:</strong> This is an automated message. Please do not reply directly to this email.
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>&copy; ${new Date().getFullYear()} CloudBnB. All rights reserved.</p>
          <p>
            <a href="https://your-cloudbnb-url.com/privacy" style="color: #3498db; text-decoration: none;">Privacy Policy</a> | 
            <a href="https://your-cloudbnb-url.com/terms" style="color: #3498db; text-decoration: none;">Terms of Service</a>
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `CloudBnB <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: "Verify Your CloudBnB Account - OTP Required",
      html: emailTemplate
    });

    return otp;
  } catch (error) {
    console.error("Error in sendEmailVerificationOTP:", error);
    throw error; // Consider throwing the error to handle it in the calling function
  }
};

module.exports = sendEmailVerificationOTP;