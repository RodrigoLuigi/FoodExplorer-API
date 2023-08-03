const knex = require('../database/knex');

class RolePermissionsRepository {
  async create(permissions) {
    await knex('role_permissions').insert(permissions);
  }
}

module.exports = RolePermissionsRepository;
