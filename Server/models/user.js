const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: {
      StreetAddress: { type: String, required: false },
      City: { type: String, required: false },
      State: { type: String, required: true },
      ZipCode: { type: String, required: false },
      Country: { type: String, required: true },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowerCase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowerCase: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?      ^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      ],
    },
    password: {
      type: String,
      required: true,
    },
    newPassword: {
      type: String,
      required: false,
    },
    AccessToken: {
      type: String,
      require: false,
    },
    gender: {
      type: String,
      require: false,
    },
    ip_address: {
      type: String,
      require: false,
      match: [
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
