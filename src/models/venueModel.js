const mongoose = require("mongoose");

const { Schema } = mongoose;

const venueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    availableDates: [
      {
        type: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
