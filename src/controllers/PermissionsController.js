const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const PermissionRepository = require('../repositories/PermissionRepository');
const PermissionCreateService = require('../services/permissions/PermissionCreateService');

class PermissionsController {
  async create(request, response) {
    const { name, description } = request.body;

    const permissionRepository = new PermissionRepository();
    const permissionCreateService = new PermissionCreateService(
      permissionRepository
    );

    const createdPermission = await permissionCreateService.execute({
      name,
      description,
    });

    return response.status(201).json(createdPermission);
  }
}

module.exports = PermissionsController;
