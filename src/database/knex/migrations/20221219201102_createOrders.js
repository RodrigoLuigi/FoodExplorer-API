exports.up = (knex) =>
  knex.schema.createTable('orders', (table) => {
    table.increments('id');
    table
      .enu('status', ['WAITING', 'IN_PRODUCTION', 'DONE'])
      .default('WAITING');
    table.text('code').notNullable();
    table.text('description').notNullable();
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('orders');
