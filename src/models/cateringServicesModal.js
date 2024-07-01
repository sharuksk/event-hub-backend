const mongoose = require("mongoose");

const { Schema } = mongoose;

const cateringServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    menuOptions: [
      {
        type: String,
      },
    ],
    priceRange: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: String,
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

const CateringService = mongoose.model("CateringService", cateringServiceSchema);

module.exports = CateringService;
