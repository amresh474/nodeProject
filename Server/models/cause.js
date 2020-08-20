const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const causeSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Cause", causeSchema);
