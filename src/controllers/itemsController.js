const Item = require("../models/itemsModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createItems = catchAsync(async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json({
    message: "success",
    newItem,
  });
});

exports.deleteItem = catchAsync(async (req, res) => {
  const id = req.params.id;
  const deletedData = await Item.findOneAndDelete({ _id: id });
  if (!deletedData) {
    return next(new AppError("Not found", 404));
  }
  res.status(200).json({ message: "Deleted successfull" });
});

exports.editItem = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedItem = await Item.findOneAndUpdate({ _id: id }, req.body, { new: true });

  if (!updatedItem) {
    return next(new AppError("Not found", 404));
  }
  res.status(201).json({ message: "Edited successful", updatedItem });
});

exports.getItems = catchAsync(async (req, res) => {
  const typeId = req.params.typeId;
  const items = await Item.find({ typeId });
  res.status(200).json({
    message: "Success",
    items,
  });
});
