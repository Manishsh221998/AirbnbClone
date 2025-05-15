const transporter = require("../config/emailConfig");
const createToken = require("../helper/createToken");
const StatusCode = require("../helper/httpStatusCode");
const sendEmailVerificationOTP = require("../helper/otpVerifyViaEmail");
const { hashPassowrd, comparePassword } = require("../middleware/hashPassword");
const EmailVerificationModel = require("../model/otpModel");
const User = require("../model/user");
const jwt=require('jsonwebtoken')
const fs= require('fs')
const path= require('path')

class UserController {
  
  //------------- User Register ----------------
  async register(req, res) {
    // console.log(req.body)
    try {
      const { username, email, password, phone } = req.body;

      if (!(username && email && password && phone)) {
        return res.status(400).json({
          status: false,
          message: "All filed is required",
        });
      }

      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res.status(401).json({
          status: false,
          message: "Email is already exists",
        });
      }

      const hashedPassword = await hashPassowrd(password);

      const data = new User({
        username,
        email,
        password: hashedPassword,
        phone,
      });
      if(req.file){
        data.image=req.file.path
      }

      if (data) {
        const user = await data.save();
        await sendEmailVerificationOTP(req, user);
        return res.status(201).json({
          status: true,
          message: "user created successfully",
          data: user,
        });
      }
    } catch (error) {
      console.log("Error :User-register error :", error);
    }
  }

  //------------- Email and OTP verify --------------
  async verify(req, res) {
    // console.log(req.body)
    try {
      const { email, otp } = req.body;

      // Check if all required fields are provided
      if (!(email && otp)) {
        return res.status(400).json({
          status: false,
          message: "All filed is required",
        });
      }

      // Check if email doesn't exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res
          .status(400)
          .json({ status: "failed", message: "Email doesn't exists" });
      }

      // Check if email is already verified
      if (existingUser.is_verified === true) {
        return res
          .status(400)
          .json({ status: false, message: "Email is already verified" });
      }

      // Check if there is a matching email and verification OTP
      const emailVerification = await EmailVerificationModel.findOne({
        userId: existingUser._id,
        otp: otp,
      });

      if (!emailVerification && !existingUser.is_verified) {
        await sendEmailVerificationOTP(req, existingUser);
        return res.status(400).json({
          status: false,
          message: "Invalid OTP, new OTP sent to your email",
        });
      }

      // Check if OTP is expired
      const currentTime = new Date();
      // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
      const expirationTime = new Date(
        emailVerification.createdAt.getTime() + 15 * 60 * 1000
      );

      //Check if, OTP expired,send new OTP
      if (currentTime > expirationTime) {
        await sendEmailVerificationOTP(req, existingUser);
        return res.status(400).json({
          status: "failed",
          message: "OTP expired, new OTP sent to your email",
        });
      }

      existingUser.is_verified = true;
      await existingUser.save();

      await EmailVerificationModel.deleteMany({ userId: existingUser._id });

      return res
        .status(200)
        .json({ status: true, message: "Email verified successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Unable to verify email, please try again later",
      });
    }
  }

  //------------- User Login --------------
  async login(req, res) {
    // console.log(req.body)
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: false,
          message: "All fields are required",
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(StatusCode.BAD_REQUEST)
          .json({ status: false, message: "User not exist" });
      }

      if (!user.is_verified) {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: false,
          message: "User is not verified",
        });
      }

      const isMatchPassword = await comparePassword(password, user.password);
      if (!isMatchPassword) {
        return res
          .status(StatusCode.BAD_REQUEST)
          .json({ status: false, message: "Invalid password" });
      }
      const token = await createToken(user);
      // console.log(token)
      res.status(StatusCode.OK).json({
        status: true,
        message: "Logged in successfully",
        data: user,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //------------- User Profile --------------
  async profile(req, res) {
    try {
      return res.status(StatusCode.OK).json({
        status: true,
        messgae: "Welcome to the user Profile",
        data: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  }

//------------- Change Profile Picture --------------
async changeProfilePic(req, res) {
  try {
    const { id } = req.body;
    
    if (!req.file) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: false,
        message: "No image file provided"
      });
    }

    const user = await User.findById(id);
    
    if (!user) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: false,
        message: "User not found"
      });
    }

    // Delete old image if it exists
    if (user.image && fs.existsSync(user.image)) {
      fs.unlinkSync(user.image);
    }

    // Update user with new image path using findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { image: req.file.path },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      status: true,
      message: "Profile picture changed successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error("Error changing profile picture:", error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Internal server error"
    });
  }
}

  //------------- Update Password --------------
  async updatePassword(req, res) {
    try {
      const { userId, password } = req.body;
      if (!password) {
        return res.status(StatusCode.BAD_REQUEST).json({
          message: "Password is required",
        });
      }
      const userData = await User.findOne({ _id: userId });
      if (userData) {
        const newPassword = await hashPassowrd(password);
        const updateUser = await User.findByIdAndUpdate(
          { _id: userId },
          { $set: { password: newPassword } }
        );
        res.status(StatusCode.OK).json({
          status: true,
          message: "Password updated successfully",
        });
      } else {
        res.status(StatusCode.BAD_REQUEST).json({
          message: "password not updated",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

    //------------- reset Password Link --------------
    async resetPasswordLink(req,res){
      try {
        const{email}=req.body
        if(!email){
          return res.status(StatusCode.BAD_REQUEST).json({
            status:false,
            message:"Email is required"
          })
        }
        const user=await User.findOne({email})
        if(!user){
          return res.status(StatusCode.BAD_REQUEST).json({   status:false,
             message: "Email doesn't exist"
             });
        }
        const secret_Key=user._id+process.env.JWT_SECRET_KEY
        // console.log("Secret key :",secret_Key)

        const token=await jwt.sign({userId:user._id,name:user.username},secret_Key,{expiresIn:'20m'})
        // console.log('token ',token)

        const resetLink=`${process.env.FRONTEND_HOST}/account/reset-password-link/${user._id}/${token}`
        await transporter.sendMail({
          to:user.email,
          subject:"Paswword reset link",
          html:`  <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background-color: #4CAF50;
            padding: 20px;
            color: white;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
            font-size: 16px;
          }
          .content p {
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            padding: 12px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            font-weight: bold;
            border-radius: 4px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 40px;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hi ${user.username},</p> <hr/>
            <p>We received a request to reset your password. If you made this request, please click the button below to reset your password.</p>
            <p>
              <a href="${resetLink}" class="button">Reset Password</a>
            </p>
            <p>If you didn't request this change, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>Thank you for using our service!</p>
            <p>If you need further assistance, feel free to <a href="mailto:support@yourcompany.com">contact our support team</a>.</p>
          </div>
        </div>
      </body>
    </html>`
        })
        res.status(200).json({ status:true, message: "Password reset email sent. Please check your email." });
     
      }
       catch (error) {
        console.log(error);
        res.status(500).json({ status:false, message: "Unable to send password reset email. Please try again later." });  
      }
    }

    //------------- Reset Password --------------
    async resetPassword(req,res){
      try {
        const{password,confirm_Password}=req.body
        const{id,token}=req.params
        
         const user=await User.findById(id)
        //  console.log("user",user)

        if(!user){
          return res.status(StatusCode.BAD_REQUEST).json({
            status:false,
            message:"User not found",
          })
        }
        const newSecret=user._id+process.env.JWT_SECRET_KEY
       const data= jwt.verify(token,newSecret);
      // console.log("token",token)

       if(!password||!confirm_Password){
        return res.status(StatusCode.BAD_REQUEST).json({ status:false, message: "New Password and Confirm New Password are required" });
      }

      if(password!==confirm_Password){
        return res.status(StatusCode.BAD_REQUEST).json({ status:false, message: "Password and Confirm Must be same" });
      }
      
     const hashedPassword=await hashPassowrd(confirm_Password)
     console.log(hashedPassword)
    const userData =  await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } });

 console.log("UserData :",userData)
    res.status(StatusCode.OK).json({ status: "success", message: "Password reset successfully" });
 
      }
       catch (error) {
        return res.status(500).json({ status: "failed", message: "Unable to reset password. Please try again later." });

      }
    }
}

module.exports = new UserController();
