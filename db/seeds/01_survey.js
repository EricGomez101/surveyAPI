
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('survey').del()
    .then(function () {
      // Inserts seed entries
      return knex('survey').insert([
        {id: 1, description: 'pokemon'},
        {id: 2, description: 'gaming'},
        {id: 3, description: 'programming'}
      ]);
    });
};
