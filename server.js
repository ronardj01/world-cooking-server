const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

//initializing express app.
const app = express();

//parse requests of content-type - application-json
app.use(express.json());

//routes
const authentication = require("./app/routes/authentication");

//ENDPOINTS
// test endpoint
app.get("/", (req, res) => {
  res.send(
    `W e l c o m e  ///   t o   ///  W o r l d  ///   C o o k i n g ! !`
  );
});

//register endpoint
app.use("/authentication", authentication);

//set port, listen for request
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
