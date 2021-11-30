const router = require("express").Router();

const { registerUser } = require("../controllers/usercontrollers");

router.post("/signup", registerUser);

module.exports = router;
