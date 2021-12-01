const User = require("../Modals/User");
const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//register a new user

const registerUser = async (req, res) => {
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
//LOGIN OF USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "please enter all requried fields" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }
    //lOGIN TOKEN
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SCERT
    );

    res.json({ existingUser, token });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { registerUser, loginUser };
