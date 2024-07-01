// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
