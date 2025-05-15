const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      // required:true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
