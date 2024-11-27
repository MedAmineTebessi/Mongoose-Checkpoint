require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const router = require("./Routes/PersonRoute");

const app = express();
const Port = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.use("/person", router);

app.listen(Port, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Server is running on port ${Port}`);
  }
});
