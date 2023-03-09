const AppError = require('../../utils/AppError');

class RoleCreateService {
  constructor(roleRepository, permissionRepository) {
    this.roleRepository = roleRepository;
    this.permissionRepository = permissionRepository;
  }

  async execute({ name, description, permissions }) {
    const checkRoleExists = await this.roleRepository.findByName(name);

    if (checkRoleExists) {
      throw new AppError('Roles already exists!');
    }

    if (!permissions || permissions.length === 0) {
      throw new AppError('As permissões não foram adicionadas.');
    }

    const checkPermissionsExists =
      await this.permissionRepository.findPermissions(permissions);

    const permissionsIds = checkPermissionsExists.map((permission) => {
      return permission.id;
    });

    const checkPermissions = permissions.every((p) =>
      permissionsIds.includes(p)
    );

    if (!checkPermissions) {
      throw new AppError('Permissões incorretas!');
    }

    const role_id = await this.roleRepository.create({ name, description });

    return {
      id: Number(role_id),
      name,
      description,
      permissions: checkPermissionsExists,
    };
  }
}

module.exports = RoleCreateService;
