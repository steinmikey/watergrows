exports.seed = function (knex, Promise) {
  return knex("users").insert([
    { username: "misha", password: "russiaisnumbertwo" },
    { username: "rocky", password: "americaisnumberone" }
  ]);
};
