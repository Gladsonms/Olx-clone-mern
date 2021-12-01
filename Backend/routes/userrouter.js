const router = require("express").Router();

const {
  registerUser,
  loginUser,
  logginIn,
} = require("../controllers/usercontrollers");

router.post("/signup", registerUser);
router.get("/login", logginIn);
router.post("/login", loginUser);

module.exports = router;
