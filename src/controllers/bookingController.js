// controllers/bookingController.js
const Booking = require("../models/bookingModel");
const Item = require("../models/itemsModel");
const Confirm = require("../models/confirmationModel");
const {
  checkItemAvailability,
  removeDatesFromBookingItems,
  addDatesToBookingItems,
} = require("../utils/utils");

// Create a new booking

exports.createBooking = async (req, res) => {
  try {
    const { date, venu, catring, decoration, photograph } = req.body;

    //Checking the availability dates
    await checkItemAvailability(date, venu, "venu");
    await checkItemAvailability(date, decoration, "Decoration");
    await checkItemAvailability(date, catring, "Catring");
    await checkItemAvailability(date, photograph, "Photograph");

    const newBooking = new Booking({ ...req.body, date: null });

    //creating confirmation collections
    [venu, catring, decoration, photograph].map(async (singleItemId) => {
      const confimation = new Confirm({
        user: req.body.user,
        clientId: req.body.clientId,
        newBooking: newBooking._id,
        date: date,
      });
      newBooking.confirmation.push(confimation._id);
      await confimation.save();
    });

    await newBooking.save();

    res.status(201).json(newBooking);
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
    const { date, venu, catring, decoration, photograph } = booking;

    await removeDatesFromBookingItems(date, venu);
    await removeDatesFromBookingItems(date, catring);
    await removeDatesFromBookingItems(date, decoration);
    await removeDatesFromBookingItems(date, photograph);

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
      const { date, venu, catring, decoration, photograph } = booking;
      await removeDatesFromBookingItems(date, venu);
      await removeDatesFromBookingItems(date, catring);
      await removeDatesFromBookingItems(date, decoration);
      await removeDatesFromBookingItems(date, photograph);

      await addDatesToBookingItems(req.body.date, venu);
      await addDatesToBookingItems(req.body.date, catring);
      await addDatesToBookingItems(req.body.date, decoration);
      await addDatesToBookingItems(req.body.date, photograph);

      for (let confirmId of booking.confirmation) {
        await Confirm.updateOne(
          { _id: confirmId },
          { $set: { date: req.body.date, isConfirmed: false, isEdited: true } },
        );
      }
    }

    Object.assign(booking, req.body);

    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
