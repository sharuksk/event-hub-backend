// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
