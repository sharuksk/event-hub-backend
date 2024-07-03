// controllers/userController.js

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//create a user

exports.createUser = catchAsync(async (req, res, next) => {
  try {
    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError("user already exists"));
    } else {
      const user = new User(req.body);
      await user.save();
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    }
  } catch (err) {
    res.status(400).json({ message: "user not found" });
  }
});

// login

exports.loginUser = catchAsync(async (req, res, next) => {
  try {
    const { email, passwordHash } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(passwordHash))) {
      res.status(200).json({
        status: "success",
        data: {
          email: email,
          password: passwordHash,
        },
      });
    } else {
      return next(new AppError("Invalid email or password"));
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
