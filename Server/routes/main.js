const express = require("express");
const authRouter = require("./auth");
const causeRouter = require("./cause");
// const loginRouter = require("./login");

const app = express.Router();
app.use("/user/", authRouter);
app.use("/cause/", causeRouter);
// app.use("/auth/", loginRouter);
module.exports = app;
