const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  isAvailable: { type: Boolean, default: true },
});

const CatererSchema = new mongoose.Schema({
  vegMenu: [{ type: String }],
  nonVegMenu: [{ type: String }],
  price: { type: Number, required: true },
});

const ClientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    role: {
      type: String,
      enum: ["photography", "decoration", "venue", "catering", "organizing Team"],
      required: true,
    },
    workExperience: { type: Number, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    bestWork: [{ type: String }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availability: [AvailabilitySchema],
    catererDetails: CatererSchema,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Client", ClientSchema);
