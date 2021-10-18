exports.up = async (knex) => {
  await knex.schema.table("plants", (plants) => {
    plants.dropColumn("owner");
  });
  await knex.schema.table("plants", (plants) => {
    plants
      .integer("owner")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("RESTRICT")
      .unsigned()
      .notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.table("plants", (plants) => {
    plants.dropColumn("owner");
  });
  await knex.schema.table("plants", (plants) => {
    plants.integer("owner").references("id").inTable("users").unsigned().notNullable();
  });
};
