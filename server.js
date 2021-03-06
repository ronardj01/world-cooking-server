const express = require("express");
require("dotenv").config();
const cors = require("cors");

//initializing express app.
const app = express();

//parse requests of content-type - application-json
app.use(express.json());

//cors setting
const corsConfig = {
  origin: process.env.FRONT_URL, //allow an especific url to acces
  credentials: true, // allow pass headers
};
app.use(cors(corsConfig)); //enable cors

//routes
const authentication = require("./app/routes/authentication");

//ENDPOINTS
// test endpoint
app.get("/", (req, res) => {
  res.send(
    `W e l c o m e  ///   t o   ///  W o r l d  ///   C o o k i n g ! !`
  );
});

//register register / login endpoints
app.use("/authentication", authentication);

//set port, listen for request
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
