
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('temporadas').del()
    .then(function () {
      // Inserts seed entries
      return knex('temporadas').insert([
        {temporada: 'Verão'},
        {temporada: 'Inverno'},
        {temporada: 'Primavera'},
        {temporada: 'Outono'}
      ]);
    });
};
