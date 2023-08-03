const PermissionRepository = require('../repositories/PermissionRepository');

const RoleRepository = require('../repositories/RoleRepository');
const RoleCreateService = require('../services/roles/RoleCreateService');

const RolesIndexService = require('../services/roles/RolesIndexService');

const RolePermissionsRepository = require('../repositories/RolePermissionsRepository');
const RolePermissionsCreateService = require('../services/role_permissions/RolePermissionsCreateService');

class RolesController {
  async create(request, response) {
    const { name, description, permissions } = request.body;

    const permissionRepository = new PermissionRepository();

    const roleRepository = new RoleRepository();
    const roleCreateService = new RoleCreateService(
      roleRepository,
      permissionRepository
    );

    const rolePermissionsRepository = new RolePermissionsRepository();
    const rolePermissionsCreateService = new RolePermissionsCreateService(
      rolePermissionsRepository
    );

    const role = await roleCreateService.execute({
      name,
      description,
      permissions,
    });

    await rolePermissionsCreateService.execute(role.id, permissions);

    return response.status(201).json(role);
  }

  async index(request, response) {
    const roleRepository = new RoleRepository();
    const rolesIndexService = new RolesIndexService(roleRepository);

    const roles = await rolesIndexService.execute();

    return response.status(200).json(roles);
  }
}

module.exports = RolesController;
