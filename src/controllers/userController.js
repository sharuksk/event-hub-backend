// controllers/userController.js
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

//create a user

exports.createUser = catchAsync(async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("functionc alled");
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError("User already exists", 400));
    }

    console.log("Else part called");

    const user = new User(req.body);

    console.log(user);

    // Attempt to save the user
    await user.save();
    console.log("After save called");

    // Convert Mongoose document to plain JavaScript object
    const userObj = user.toObject();
    userObj.id = userObj._id;

    // Remove the password field from the response
    delete userObj.password;

    res.status(200).json({
      status: "success",
      data: userObj,
    });
  } catch (err) {
    console.error("Error details:", err); // Log the error details
    res
      .status(400)
      .json({ message: "An error occurred while creating the user", error: err.message });
  }
});

// login

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        status: "success",
        data: {
          name: user.name,
          email: email,
          id: user._id,
          role: user.role,
          phoneNumber: user.phoneNumber,
        },
      });
    } else {
      return next(new AppError("Invalid email or password"));
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// Get user by id
exports.getUserById = async (req, res, next) => {
  const users = await User.findById(req.params.id);
  res.status(200).json({ users });
};
