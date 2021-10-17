const bcrypt = require("bcryptjs");

function hashUser(username, password) {
  let user = {
    username: username,
    password: password
  };
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  return user;
}

exports.seed = async function (knex, Promise) {
  return await knex("users").insert([
    hashUser("lambda", "school"),
    hashUser("build", "week"),
    hashUser("misha", "daladno")
  ]);
};
