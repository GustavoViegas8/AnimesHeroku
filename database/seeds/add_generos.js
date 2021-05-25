
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('generos').del()
    .then(function () {
      // Inserts seed entries
      return knex('generos').insert([
        {genero: 'Shonen'},
        {genero: 'Shoujo'},
        {genero: 'Ecchi'},
        {genero: 'Harem'},
        {genero: 'Seinen'},
        {genero: 'Hentai'}
      ]);
    });
};
