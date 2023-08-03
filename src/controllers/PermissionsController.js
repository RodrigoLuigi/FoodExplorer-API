const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const PermissionRepository = require('../repositories/PermissionRepository');
const PermissionCreateService = require('../services/permissions/PermissionCreateService');
const PermissionIndexService = require('../services/permissions/PermissionIndexService');

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

  async index(request, response) {
    const permissionRepository = new PermissionRepository();
    const permissionIndexService = new PermissionIndexService(
      permissionRepository
    );

    const permissions = await permissionIndexService.execute();

    return response.status(200).json(permissions);
  }
}

module.exports = PermissionsController;
