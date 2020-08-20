const schema = require("./user.schema");
const Joi = require("@hapi/joi");

async function addUserValidation(req, res, next) {
  const body = req.body;
  try {
    await schema.validateAsync(body);
    // console.log(`****************${value}`);
    next();
  } catch (error) {
    console.log(`###########${error}`);

    return res.json({
      success: false,
      message: error.details[0].message,
    });
  }

  // return res.json(value);
}
module.exports = addUserValidation;
