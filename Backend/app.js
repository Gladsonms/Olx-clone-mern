const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userrouter");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

//set up port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));

//set up databse
var mongoDB = "mongodb://127.0.0.1/olx_Clone";
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      return console.error(error);
    } else {
      console.log("databse connected succesfully ");
    }
  }
);

//app.use(express.json());
app.use(
  cors(
    { origin: ["http://localhost:3000"], credentials: true },
    { httpOnly: true }
  )
);

// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     parameterLimit: 100000,
//     extended: true,
//   })
// );
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

//set user Router

app.use("/users", userRouter);
