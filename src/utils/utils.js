const Item = require("../models/itemsModel");
const mongoose = require("mongoose");

const checkItemAvailability = async (date, itemId, itemName) => {
  const item = await Item.findById(itemId);
  if (item && item.dates.includes(date)) {
    return res.status(400).json({ message: itemName + " date is not available" });
  }
  return true;
};

const removeDatesFromBookingItems = async (date, itemId) => {
  const item = await Item.findById(itemId);
  const dateIndex = item.dates.findIndex((d) => d.toISOString() === date.toISOString());
  if (dateIndex === -1) {
    console.log("Date not found in item");
    return false;
  }

  await Item.updateOne({ _id: itemId }, { $pull: { dates: date } });
  return true;
};

const addDatesToBookingItems = async (date, itemId) => {
  await Item.updateOne({ _id: itemId }, { $addToSet: { dates: date } });
  console.log("date added");
  return true;
};

module.exports = { checkItemAvailability, removeDatesFromBookingItems, addDatesToBookingItems };
