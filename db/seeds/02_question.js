
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('question').del()
    .then(function () {
      // Inserts seed entries
      return knex('question').insert([
        {id: 1, description: 'lorem', answer: true, survey_id: 1},
        {id: 2, description: 'ipsum', answer: true, survey_id: 1},
        {id: 3, description: 'dolor', answer: true, survey_id: 1}
      ]);
    });
};
