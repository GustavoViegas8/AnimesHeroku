exports.up = (knex) => {
    return knex.schema.createTable("estudios", (table) => {
      table.increments();
      table.string("estudio", 80).notNullable();
      table.timestamps(true, true);
    });
  };
  exports.down = (knex) => knex.schema.dropTable("estudios");
  