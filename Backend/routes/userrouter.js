const router = require("express").Router();

//import { registerUser } from "../controllers/authcontrollers";

router.post("/signup", async (req, res) => {
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
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
