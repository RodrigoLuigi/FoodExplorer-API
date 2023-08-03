exports.up = (knex) =>
  knex.schema.createTable('categories', (table) => {
    table.increments('id');
    table.text('name').notNullable();
    table.text('icon').defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('categories');
