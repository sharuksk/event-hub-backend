// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: 'User',
    },
    venue: {
      type: String,
    },
    photography: {
      type: String,
    },
    decoration: {
      type: String,
    },
    catering: {
      type: String,
    },
    organizingTeam: {
      type: String,
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Booking", BookingSchema);
