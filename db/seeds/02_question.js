
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('question').del()
    .then(function () {
      // Inserts seed entries
      return knex('question').insert([
        {description: 'lorem', answer: true, survey_id: 1},
        {description: 'ipsum', answer: true, survey_id: 1},
        {description: 'dolor', answer: true, survey_id: 1}
      ]);
    });
};
