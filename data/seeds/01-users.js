const bcrypt = require("bcryptjs");

function hashUser(username, password, phone) {
  let user = {
    username: username,
    password: password,
    phone: phone
  };
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  return user;
}

exports.seed = async function (knex, Promise) {
  return await knex("users").insert([
    hashUser("lambda", "school", "123 456-7890"),
    hashUser("buildweek", "123456"),
    hashUser("misha", "daladno")
  ]);
};
