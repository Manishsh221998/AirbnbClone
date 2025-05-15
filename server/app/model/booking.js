const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    check_in: {
      type: Date,
      required: true,
    },
    check_out: {
      type: Date,
      required: true,
    },
    guests: {
        adults: { type: Number, default: 1 },
        children: { type: Number, default: 0 },
      },
    totalPrice: {
        type: Number,
        // required: true
      },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const BookingModel = mongoose.model("booking", BookingSchema);
module.exports = BookingModel;
