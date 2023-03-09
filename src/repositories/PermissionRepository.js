const knex = require('../database/knex');

class PermissionRepository {
  async findPermissions(permissions) {
    const permissionsFound = await knex('permissions').whereIn(
      'id',
      permissions
    );

    return permissionsFound;
  }

  async findByName(name) {
    const permissionFound = await knex('permissions').where({ name }).first();

    return permissionFound;
  }

  async create({ name, description }) {
    const permission_id = await knex('permissions').insert({
      name,
      description,
    });

    return permission_id;
  }
}

module.exports = PermissionRepository;
