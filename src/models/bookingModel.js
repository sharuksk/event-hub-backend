// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //type: String,
      ref: "User",
      required: true,
    },
    venu: { type: mongoose.Schema.Types.ObjectId, required: true },
    catring: { type: mongoose.Schema.Types.ObjectId, required: true },
    decoration: { type: mongoose.Schema.Types.ObjectId, required: true },
    photograph: { type: mongoose.Schema.Types.ObjectId, required: true },
    organizingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "Organizer",
      required: true,
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
    confirmation: {
      type: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Confirm" }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Booking", BookingSchema);
