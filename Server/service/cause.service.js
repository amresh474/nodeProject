const Cause = require("../models/cause");
const { execAsync } = require("../utils/utility");
const log = require("../utils/logger");
const mongoose = require("mongoose");

async function createCause(content) {
  log.info("service method called from service layer");
  const cause = new Cause(content);
  return execAsync(() => cause.save());
}

async function getCauses(query = {}) {
  log.info("getCauses method call from service ");
  const match = {};
  if (query.published) {
    match.published = query.published === "true";
    return execAsync(() => Cause.findOne().populate({ match }));
    // findOne({ title: 'Casino Royale' }).populate('authors')
  }
  return execAsync(() => Cause.find());
}

async function getCause(id) {
  log.info(`getCause method called from service layer  ${id}`);
  return execAsync(() => Cause.findById(id));
}

async function removeContent(id) {
  return execAsync(() => Cause.findByIdAndDelete(id));
}
async function updateCause(id, updateCause) {
  return execAsync(() =>
    Cause.findByIdAndUpdate(
      { _id: id },
      {
        title: updateCause.title || "Untitled Note",
        description: updateCause.description,
      },
      { new: true }
    )
  );
}
module.exports = {
  createCause,
  getCauses,
  updateCause,
  getCause,
  removeContent,
};
