// controllers/bookingController.js
const Booking = require("../models/bookingModel");
const Item = require("../models/itemsModel");
const Confirm = require("../models/confirmationModel");

// Create a new booking

exports.createBooking = async (req, res) => {
  try {
    const { itemIds } = req.body;

    itemIds.map(async (itemId) => {
      const newBooking = new Booking({
        ...req.body,
        itemId,
      });
      await newBooking.save();
      return;
    });
    res.status(201).json({ message: "New booking added" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";

    const { date, itemId } = booking;

    const item = await Item.findById(itemId);
    const dateIndex = item.dates.findIndex((d) => d.toISOString() === date.toISOString());
    if (dateIndex === -1) {
      console.log("Date not found in item");
    } else {
      await Item.updateOne({ _id: itemId }, { $pull: { dates: date } });
    }

    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// edit booking
exports.editBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (req.body.date) {
      const { date, itemId } = booking;

      const item = await Item.findById(itemId);
      const dateIndex = item.dates.findIndex((d) => d.toISOString() === date.toISOString());
      if (dateIndex === -1) {
        console.log("Date not found in item");
      }

      await Item.updateOne({ _id: itemId }, { $pull: { dates: date } });
    }

    Object.assign(booking, { ...req.body, isEdited: true });

    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
