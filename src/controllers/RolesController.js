const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class RolesController {
  async create(request, response) {
    const { name, description, permissions } = request.body;

    const existRole = await knex('roles').where({ name }).first();

    if (existRole) {
      throw new AppError('Roles already exists!');
    }

    if (!permissions || permissions.length === 0) {
      throw new AppError('As permissões não foram adicionadas.');
    }

    const existsPermissions = await knex('permissions').whereIn(
      'id',
      permissions
    );

    const permissionsIds = existsPermissions.map((permission) => {
      return permission.id;
    });

    const checkPermissions = permissions.every((p) =>
      permissionsIds.includes(p)
    );

    if (!checkPermissions) {
      throw new AppError('Permissões incorretas!');
    }

    const role_id = await knex('roles').insert({ name, description });

    const permissionsInsert = permissions.map((permission_id) => {
      return { permission_id, role_id };
    });

    await knex('permissions_roles').insert(permissionsInsert);

    return response.status(201).json({ name, description, existsPermissions });
  }
}

module.exports = RolesController;
