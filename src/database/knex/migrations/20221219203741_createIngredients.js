exports.up = (knex) =>
  knex.schema.createTable('ingredients', (table) => {
    table.increments('id');
    table.text('name').notNullable();
    table.text('imagePath').defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('ingredients');
