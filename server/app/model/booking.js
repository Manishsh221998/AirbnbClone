const { Schema, model } = require("mongoose");

const BookingSchema = new Schema(
  {
    check_in: {
      type: String,
      required: true,
    },
    check_out: { 
      type: String,
      required: true,
    },
    guests: {
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
      infants: { type: Number, default: 0 },
      pets: { type: Number, default: 0 },
    },
    totalPrice: {
      type: String,
    },
    userId: {
      type: String,
      // ref: "user", 
    },
    title:{
      type:String
    },
    userName:{
      type:String
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BookingModel = model("booking", BookingSchema);
module.exports = BookingModel;
