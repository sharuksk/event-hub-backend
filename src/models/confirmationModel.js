// models/Booking.js
const mongoose = require("mongoose");

const ConfirmationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    newBooking: { type: mongoose.Schema.Types.ObjectId },

    date: {
      type: Date,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Confirm", ConfirmationSchema);
