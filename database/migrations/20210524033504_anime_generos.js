exports.up = (knex) => {
    return knex.schema.createTable("generos", (table) => {
      table.increments();
      table.string("genero", 20).notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = (knex) => knex.schema.dropTable("generos");
  