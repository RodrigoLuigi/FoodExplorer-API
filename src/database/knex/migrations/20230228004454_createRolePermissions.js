exports.up = (knex) =>
  knex.schema.createTable('role_permissions', (table) => {
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

exports.down = (knex) => knex.schema.dropTable('role_permissions');
