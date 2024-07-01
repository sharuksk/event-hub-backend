const mongoose = require("mongoose");

const { Schema } = mongoose;

const photographerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    portfolio: [
      {
        type: String,
      },
    ],
    contactInfo: {
      type: String,
      required: true,
    },
    availableDates: [
      {
        type: Date,
      },
    ],
    priceRange: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Photographer = mongoose.model("Photographer", photographerSchema);

module.exports = Photographer;
