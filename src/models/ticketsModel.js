const mongoose = require("mongoose");

const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
