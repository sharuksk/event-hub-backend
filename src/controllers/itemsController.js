const Item = require("../models/itemsModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");

const storage = new GridFsStorage({
  url: process.env.DATABASE_LOCAL,
  file: (req, file) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "images",
        filename: `${Date.now()}_${file.originalname}`,
      };
    }
  },
});

const upload = multer({ storage });

exports.uploadImages = upload.array("images", 10);

exports.createItems = catchAsync(async (req, res, next) => {
  // const imageFiles = req.files.map((file) => file.filename);

  // req.body.images = imageFiles;

  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json({
    message: "success",
    newItem,
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedData = await Item.findOneAndDelete({ _id: id });
  if (!deletedData) {
    return next(new AppError("Not found", 404));
  }
  res.status(200).json({ message: "Deleted successfull" });
});

exports.editItem = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedItem = await Item.findOneAndUpdate({ _id: id }, req.body, { new: true });

  if (!updatedItem) {
    return next(new AppError("Not found", 404));
  }
  res.status(201).json({ message: "Edited successful", updatedItem });
});

exports.getItemsByType = catchAsync(async (req, res, next) => {
  const typeId = req.params.typeId;
  const items = await Item.find({ typeId });
  res.status(200).json({
    message: "Success",
    items,
  });
});

exports.getSingleItemById = catchAsync(async (req, res, next) => {
  const itemId = req.params.itemId;
  const item = await Item.findById(itemId);
  if (!item) return next(new AppError("Item not found", 404));

  res.status(200).json({ message: "success", item: item });
});
