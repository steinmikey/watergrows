const db = require("../../data/db-config");

function getAllUsers() {
  return db("users").select("id", "username", "phone");
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
  return db("users").select("id", "username", "password", "phone").where({ id }).first();
}

async function createUser(user) {
  const [newUser] = await db("users").insert(user, ["id", "username", "phone"]);
  return newUser;
}

function updateUserAccount(user_id, changes) {
  return db("users").where("id", user_id).update(changes, ["id", "username", "password", "phone"]);
}

function deleteUser(id) {
  return db("users").where("id", id).del();
}

module.exports = {
  getAllUsers,
  findBy,
  findById,
  createUser,
  updateUserAccount,
  deleteUser
};
