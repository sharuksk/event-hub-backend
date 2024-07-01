// controllers/userController.js

const User = require("../models/userModel");

//create a user

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "user already exists" });
    } else {
      const user = new User(req.body);
      await user.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).json({ message: "user not found" });
  }
};

// login

exports.loginUser = async (req, res) => {
  const { email, passwordHash } = req.body;

  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await user.matchPassword(passwordHash))) {
    res.status(200).json({
      email: email,
      password: passwordHash,
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};
