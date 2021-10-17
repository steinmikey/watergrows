exports.seed = function (knex, Promise) {
  return knex("users").insert([
    { username: "lambda", password: "$2a$08$EHMcH9wPs/XWeALgz7KB3uXPeQe3Z4n4GiKo7gh/TFDsqd1k5qpVW" },
    { username: "rocky", password: "americaisnumberone" }
  ]);
};
