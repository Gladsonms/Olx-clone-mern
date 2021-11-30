const User = require("../Modals/User");
const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { response } = require("express");

//register a new user

const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password, phone } = req.body;
    if (!username || !email || !password || !phone) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all requiured fields" });
    }
    //checking eamil exist or not

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "User eamil already exists",
      });
    }
    //Hashing the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      passwordHash,
      username,
      phone,
    });
    const savedUser = await newUser.save();
    //new enitity
    res.status(201).json({ message: "signup success" });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
module.exports = { registerUser };
