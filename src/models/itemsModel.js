const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemSchema = new Schema({
  typeId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  menuOptions: [
    {
      type: String,
    },
  ],
  contactInfo: {
    type: String,
    required: true,
  },
  portfolio: [
    {
      type: String,
    },
  ],
  dates: [
    {
      type: Date,
      required: true,
    },
  ],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
