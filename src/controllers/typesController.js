const Type = require("../models/typeModel");

exports.createType = async (req, res) => {
  try {
    const newType = new Type(req.body);
    await newType.save();
    res.status(201).json({
      message: "success",
      newType,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteType = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Type.findOneAndDelete({ _id: id });

    if (!deleted) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
