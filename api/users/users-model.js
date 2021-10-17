const db = require("../../data/db-config");

function getAllUsers() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
  return db("users").select("id", "username", "password").where({ id }).first();
}

async function createUser(user) {
  const [newUser] = await db("users").insert(user, ["id", "username"]);
  return newUser;
}

function updateUserPassword(user_id, hash) {
  return db("users").where("id", user_id).update({ password: hash }, ["id", "username", "password"]);
}

module.exports = {
  getAllUsers,
  findBy,
  findById,
  createUser,
  updateUserPassword
};
