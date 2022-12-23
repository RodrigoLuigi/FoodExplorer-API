exports.up = (knex) =>
  knex.schema.createTable('ingredients', (table) => {
    table.increments('id');
    table.text('name');
    table.text('imagePath').default(null);
  });

exports.down = (knex) => knex.schema.dropTable('dishes');
