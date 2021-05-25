
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('estudios').del()
    .then(function () {
      // Inserts seed entries
      return knex('estudios').insert([
        {estudio: 'Studio  Pierrot'},
        {estudio: 'MAPPA'},
        {estudio: 'Toei Animation'},
        {estudio: 'Bones'},
        {estudio: 'kyoto Animation'},
        {estudio: 'Studio Ghibli'},
        {estudio: 'Sunrise'}
      ]);
    });
};
