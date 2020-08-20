// Call in installed dependencies
const dotenv = require("dotenv");
const express = require("express");
const homeRoute = require("./Server/routes/index");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const log = require("./Server/utils/logger");

// set up dependencies
const mainRouter = require("./Server/routes/main");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
require("dotenv").config();

//To allow cross-origin requests
app.use(cors());

// connect to mongoose
const MONGODB_URL = process.env.MONGODB;
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(`Error connecting to database ${error.message}`);
  });

// set up port
const port = process.env.PORT || 7066;

app.use(cookieParser());
// set up route
homeRoute(app);
app.use("/api/", mainRouter);

// set up route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Project Support",
  });
});

// set up a wildcard route to catch related endpoints and outputs a response.
app.all("*", (req, res) => {
  return apiResponse.notFoundResponse(res, "Page not found ");
});

app.listen(port);
log.info(`Server listening on port ${port}`);
module.exports = app;
