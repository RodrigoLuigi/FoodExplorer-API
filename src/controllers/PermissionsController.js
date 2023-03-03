const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class PermissionsController {
  async create(request, response) {
    const { name, description } = request.body;

    const existPermission = await knex('permissions').where({ name }).first();

    if (existPermission) {
      throw new AppError('Permission already exists!');
    }

    const permission_id = await knex('permissions').insert({
      name,
      description,
    });

    const permission = await knex('permissions')
      .where({ id: permission_id })
      .first();

    return response.json(permission);
  }
}

module.exports = PermissionsController;
