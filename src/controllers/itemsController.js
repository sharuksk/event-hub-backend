const Item = require("../models/itemsModel");
const Items = require("../models/itemsModel");

exports.createItems = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({
      message: "success",
      newItem,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await Item.findOneAndDelete({ _id: id });
    if (!deletedData) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Deleted successfull" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.editItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = await Item.findOneAndUpdate({ _id: id }, req.body, { new: true });
    console.log(updatedItem);
    if (!updatedItem) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(201).json({ message: "Edited successful", updatedItem });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getItems = async (req, res) => {
  try {
    const typeId = req.params.typeId;
    const items = await Item.find({ typeId });
    res.status(200).json({
      message: "Success",
      items,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
