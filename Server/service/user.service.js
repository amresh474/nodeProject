const User = require("../models/user");
const { execAsync } = require("../utils/utility");
const log = require("../utils/logger");

async function createUser(user) {
  log.info(" createUser userservice method called  ");
  // const newUser = new User(user);
  log.info("user data save in data base ");
  return execAsync(() => User.insertMany(user));
}
async function getUserbyName(userName) {
  return execAsync(() => User.find(userName));
}

async function getUser(userName, email) {
  return execAsync(() =>
    User.find({
      $or: [{ username: userName }, { email: email }],
    })
  );
}

async function saveAccessToken(id, accessToken) {
  return execAsync(() =>
    User.findByIdAndUpdate(
      { _id: id },
      { AccessToken: accessToken },
      { new: true }
    )
  );
}

async function getUsers(query, page, limit) {
  log.info("getAllUser method called from service ");
  let nurser = "";

  const users = execAsync(() => User.find(query));
  log.info("find method ended  from  service ");
  for (let index = 0; index < users.length; index++) {
    let element = users[index].password;
    let str = element.slice(element.length - 8);

    nurser = await User.updateOne(
      { _id: users[index]._id },
      { $set: { newPassword: str } }
    );
    log.info("new password method saved in  dataBase ");
  }
  return users;
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  saveAccessToken,
  getUserbyName,
};
