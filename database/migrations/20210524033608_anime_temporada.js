exports.up = (knex) => {
    return knex.schema.createTable("temporadas", (table) => {
      table.increments();
      table.string("temporada", 20).notNullable();
      table.timestamps(true, true);
    });
  };
  exports.down = (knex) => knex.schema.dropTable("temporadas");
  