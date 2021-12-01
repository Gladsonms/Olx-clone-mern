const router = require("express").Router();

const { registerUser, loginUser } = require("../controllers/usercontrollers");

router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;
