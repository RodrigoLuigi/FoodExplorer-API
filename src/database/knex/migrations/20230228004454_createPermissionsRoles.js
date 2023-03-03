exports.up = (knex) =>
  knex.schema.createTable('permissions_roles', (table) => {
    table.increments('id');
    table
      .integer('permission_id')
      .references('id')
      .inTable('permissions')
      .onDelete('CASCADE');
    table
      .integer('role_id')
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('permissions_roles');
