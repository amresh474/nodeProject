const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

exports.validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
