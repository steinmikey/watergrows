exports.up = async (knex) => {
  await knex.schema.table("users", (users) => {
    users.renameColumn("user_id", "id");
  });
  await knex.schema.createTable("plants", (plants) => {
    plants.increments();
    plants.string("nickname", 200).notNullable();
    plants.string("species", 200).notNullable();
    plants.string("h2oFrequency", 200).notNullable();
    plants.string("img_URL", 200);
    plants.integer("owner").references("id").inTable("users").unsigned().notNullable();
    plants.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("plants");
  await knex.schema.table("users", (users) => {
    users.renameColumn("id", "user_id");
  });
};
