exports.up = (knex) =>
  knex.schema.createTable('users_roles', (table) => {
    table.increments('id');
    table
      .integer('role_id').defaultTo(1)
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('users_roles');
