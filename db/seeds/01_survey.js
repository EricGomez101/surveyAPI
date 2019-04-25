
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('survey').del()
    .then(function () {
      // Inserts seed entries
      return knex('survey').insert([
        {description: 'pokemon'},
        {description: 'gaming'},
        {description: 'programming'}
      ]);
    });
};
