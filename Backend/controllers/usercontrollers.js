const User = require("../Modals/User");
const Product = require("../Modals/Product");
const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { cloudinary } = require("../utlis/cloundinary");

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
const logginIn = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.json(false);
    }
    jwt.verify(token, process.env.JWT_SCERT);
    res.send({ status: true });
  } catch (error) {
    res.send({ status: false });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
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

//logiut user
const getLogoutUser = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHaeder;

    res.json({ logout: true });
  } catch (error) {
    console.error(error);
  }
};
const createPost = async (req, res) => {
  const { name, category, price, preivewSource } = req.body;

  try {
    const uploadedResponse = await cloudinary.uploader.upload(preivewSource, {
      upload_preset: "dev_setup",
    });

    let image = uploadedResponse.url;

    if (!name || !category || !price || !image) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fiels" });
    }

    const newPost = new Product({
      product: name,
      category,
      price,
      image,
    });

    const savedProduct = await newPost.save();
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  registerUser,
  loginUser,
  logginIn,
  getLogoutUser,
  createPost,
};
