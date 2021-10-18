exports.up = async (knex) => {
  await knex.schema.table("users", (users) => {
    users.string("phone", 20);
  });
};

exports.down = async (knex) => {
  await knex.schema.table("users", (users) => {
    users.dropColumn("phone");
  });
};
