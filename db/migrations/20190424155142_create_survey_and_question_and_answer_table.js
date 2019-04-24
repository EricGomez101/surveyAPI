
exports.up = function(knex, Promise) {
  return knex.schema.createTable('survey', (table) => {
    table.increments();
    table.string('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('question', (table) => {
    table.increments();
    table.string('description').notNullable();
    table.boolean('answer').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('survey_id').references('id').inTable('survey').unique();
  })
  .createTable('answer', (table) => {
      table.integer('question_id').references('id').inTable('question').primary();
      table.boolean('answer').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('survery').dropTable('question').dropTable('answer');
};
