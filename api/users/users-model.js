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
// WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
// AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
// UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL

module.exports = {
  getAllUsers,
  findBy,
  findById,
  createUser
};
