const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

//routes
const authentication = require("./app/routes/authentication");

//endpoints
// test endpoint
app.get("/", (req, res) => {
  res.send(
    `W e l c o m e  ///   t o   ///  W o r l d  ///   C o o k i n g ! !`
  );
});

//register
app.use("/authentication", authentication);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
