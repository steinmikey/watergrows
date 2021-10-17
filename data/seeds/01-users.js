exports.seed = function (knex) {
  return knex("users").insert([
    { recipe_name: "water", when_created: "the beginning of time" },
    { recipe_name: "brownies", when_created: "yesterday" },
    { recipe_name: "banana bread", when_created: "today" },
    { recipe_name: "lasagna", when_created: "tomorrow" }
  ]);
};
