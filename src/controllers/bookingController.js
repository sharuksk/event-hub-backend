// controllers/bookingController.js
const Booking = require("../models/bookingModel");
const Item = require("../models/itemsModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a new booking

exports.createBooking = catchAsync(async (req, res, next) => {
  const { itemIds } = req.body;

  itemIds.map(async (itemId) => {
    const newBooking = new Booking({
      ...req.body,
      itemId,
    });
    await newBooking.save();
  });
  res.status(201).json({ message: "New booking added" });
});

// Cancel a booking
exports.cancelBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new AppError("Booking not found", 404));
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
});

// Get all bookings
exports.getBookings = async (req, res, next) => {
  const bookings = await Booking.find();
  res.status(200).json(bookings);
};

// edit booking
exports.editBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new AppError("Booking not found", 404));
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
});
