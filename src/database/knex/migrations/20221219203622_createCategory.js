exports.up = (knex) =>
  knex.schema.createTable('category', (table) => {
    table.increments('id');
    table.text('name');
    table.text('icon');
  });

exports.down = (knex) => knex.schema.dropTable('dishes');
