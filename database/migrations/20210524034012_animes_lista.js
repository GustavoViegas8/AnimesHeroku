exports.up = (knex) => {
    return knex.schema.createTable("lista", (table) => {
      table.increments();
      table.integer("idUser").notNullable().unsigned();
      table
        .foreign("idUser")
        .references("usuarios.id")
        .onDelete("restrict")
        .onUpdate("cascade");
      table.string("titulo", 80).notNullable();
      table.integer("ano").notNullable();
      table.integer("episodios").notNullable();
      table.string("LinkFoto", 1000);
      table.boolean("destaque").notNullable().defaultTo(false);
      table.integer("genero_id").notNullable().unsigned();
      table
        .foreign("genero_id")
        .references("generos.id")
        .onDelete("restrict")
        .onUpdate("cascade");
      table.integer("temporada_id").notNullable().unsigned();
      table
        .foreign("temporada_id")
        .references("temporadas.id")
        .onDelete("restrict")
        .onUpdate("cascade");
      table.integer("estudio_id").notNullable().unsigned();
      table
        .foreign("estudio_id")
        .references("estudios.id")
        .onDelete("restrict")
        .onUpdate("cascade");
      table.timestamps(true, true);
    });
  };
  exports.down = (knex) => knex.schema.dropTable("lista");
  