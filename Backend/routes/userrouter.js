const router = require("express").Router();

const {
  registerUser,
  loginUser,
  logginIn,
  getLogoutUser,
} = require("../controllers/usercontrollers");

router.post("/signup", registerUser);
router.get("/login", logginIn);
router.post("/login", loginUser);
router.get("/logout", getLogoutUser);

module.exports = router;
