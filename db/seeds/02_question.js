
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('question').del()
    .then(function () {
      // Inserts seed entries
      return knex('question').insert([
        {description: 'lorem', answer: true, survey_id: 1},
        {description: 'ipsum', answer: true, survey_id: 1},
        {description: 'dolor', answer: true, survey_id: 1},
        {description: 'sit', answer: false, survey_id: 1},
        {description: 'amet', answer: true, survey_id: 1},
        {description: 'dolor', answer: false, survey_id: 1},
        {description: 'lorem', survey_id: 2},
        {description: 'ipsum', survey_id: 2},
        {description: 'dolor', survey_id: 2},
        {description: 'sit', survey_id: 3},
        {description: 'amet', survey_id: 3},
        {description: 'dolor', survey_id: 3}
        
      ]);
    });
};
