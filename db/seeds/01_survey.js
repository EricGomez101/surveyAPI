
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('survey').del()
    .then(function () {
      // Inserts seed entries
      return knex('survey').insert([
        {description: 'lorem ipsum', test: true},
        {description: 'gaming', test:false},
        {description: 'programming', test:false}
      ]);
    });
};
