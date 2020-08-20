// import required dependencies
const Token = require("../middleware/token");
const log = require("../utils/logger");
const UserService = require("../service/user.service");
const encryption = require("../utils/encryption");
const os = require("os");

async function createUser(req, res, next) {
  log.info("createUser called");
  const ip_address = os.networkInterfaces();
  req.body.ip_address = ip_address.lo[0].address;

  let password = req.body.password;
  const { username, email } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please ensure you fill the username, email, and password",
    });
  }
  try {
    req.body.password = await encryption.hashPassword(password);

    const user = await UserService.getUser(username, email);
    if (user.data.length > 0) {
      return res.status(404).json({
        status: 404,
        message: `This user exists  ${req.body.username}`,
      });
    }
    const newUser = [req.body];
    const registerUser = await UserService.createUser(newUser);
    return res.status(201).json({
      status: 201,
      message: "User signup successfully",
      User: registerUser,
    });
  } catch (error) {
    log.error(error);
    return res.status(500).json({ status: 500, message: error.message });
  }
}

async function loginUser(req, res, next) {
  log.info(`loginUser called for userId : ${req.body.username} `);
  const { username, password, email } = req.body;
  try {
    const user = await UserService.getUser(username, email);
    if (user.data.length === 0) {
      res.status(404).json({
        status: 404,
        message: `username does not exist `,
      });
    }
    const validPassword = await encryption.validatePassword(
      password,
      user.data[0].password
    );
    if (!validPassword) {
      res.status(401).json({
        status: 401,
        message: "Password is not correct",
      });
    }
    const accessToken = Token(user);
    const userWithAccessToken = await UserService.saveAccessToken(
      user.data[0]._id,
      accessToken
    );
    res.status(200).json({
      status: 200,
      data: userWithAccessToken,
      message: "Succesfully Users login",
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}

async function getAllUser(req, res, next) {
  const page = req.params.page ? req.params.page : 1;
  const limit = req.params.limit ? req.params.limit : 10;
  try {
    var users = await UserService.getUsers({}, page, limit);
    log.info(`UserService is called `);
    return res.status(200).json({
      status: 200,
      data: users,
      message: "Succesfully Users Retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

module.exports = { createUser, loginUser, getAllUser };
