const Joi = require("@hapi/joi");
const schema = Joi.object({
  // newUser: {
  lastName: Joi.string()
    .min(3)
    .max(6)
    .required(),
  gender: Joi.string()
    .valid("m", "f", "o")
    .required(),
  phoneNumber: Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .message("invalid mobile number ")
    .required(),
  username: Joi.string()
    .min(3)
    .max(6)
    .required(),
  firstName: Joi.string()
    .min(3)
    .max(6)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[\w]{8,30}$/)
    .min(6)
    .required(),
}).unknown();

module.exports = schema;
