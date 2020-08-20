const causeService = require("../service/cause.service");
const log = require("../utils/logger");

// create new cause
async function createCause(req, res, next) {
  log;
  const cause = req.body;
  // Validate request
  if (!req.body.description) {
    return res.status(404).json({
      status: 404,
      message: "Note content can not be empty",
    });
  }
  try {
    const causes = await causeService.createCause(cause);
    res.status(200).json({
      status: 200,
      data: causes,
      message: "New cause created successfully",
    });
  } catch (error) {
    next(res.status(500).json({ status: 500, message: error.message }));
  }
}

// Get all causes
async function getAllCause(req, res, next) {
  const pagination = req.params;
  // const { queryUser } = req.query;
  try {
    const causes = await causeService.getCauses(req.query);
    res.status(200).send({
      success: 200,
      message: "A list of all causes",
      cause: causes,
    });
  } catch (error) {
    next(res.status(404).json({ status: 404, message: error.message }));
  }
}

// get single cause
async function getSingleCause(req, res, next) {
  const id = req.params.causeId;
  try {
    const singleCause = await causeService.getCause(id);
    if (!singleCause.data) {
      return next(
        res.status(404).json({
          status: 404,
          message: "Note not found with id " + req.params.causeId,
        })
      );
    }
    res.status(200).json({
      success: 200,
      message: `More on ${singleCause.title}`,
      Cause: singleCause,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

// update cause
async function updateCause(req, res) {
  const id = req.params.causeId;
  const updateObject = req.body;
  try {
    const updateCause = await causeService.updateCause(id, updateObject);
    if (!updateCause.data) {
      return res.status(404).json({
        status: 404,
        message: "Note not found with id " + req.params.causeId,
      });
    }
    res.status(200).json({
      success: 200,
      message: "Cause is updated",
      updateCause: updateCause,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}

// delete a cause
async function deleteCause(req, res) {
  const id = req.params.causeId;
  try {
    const note = await causeService.removeContent(id);
    if (!note.data) {
      res.status(404).json({
        status: 404,
        message: "Note not found with id " + req.params.causeId,
      });
    }
    res.status(200).json({
      success: 200,
      message: "successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}

module.exports = {
  createCause,
  getAllCause,
  updateCause,
  getSingleCause,
  deleteCause,
};
