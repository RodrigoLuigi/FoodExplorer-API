const knex = require('../database/knex');

class RolePermissionsRepository {
  async create(permissions) {
    await knex('permissions_roles').insert(permissions);
  }
}

module.exports = RolePermissionsRepository;
