// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: 'User',
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    photography: {
      type: String,
      required: true,
    },
    decoration: {
      type: String,
      required: true,
    },
    catering: {
      type: String,
      required: true,
    },
    organizingTeam: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
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
