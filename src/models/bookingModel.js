// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //type: String,
      ref: "User",
      required: true,
    },
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Client" },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Item" },
    organizingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "Organizer",
      // required: true,
    },
    date: [
      {
        type: Date,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    groupId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Booking", BookingSchema);
