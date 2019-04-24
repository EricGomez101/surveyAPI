
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('answer').del()
    .then(function () {
      // Inserts seed entries
      return knex('answer').insert([
        {question_id: 1, answer: true},
        {question_id: 2, answer: false},
        {question_id: 3, answer: false}
      ]);
    });
};
