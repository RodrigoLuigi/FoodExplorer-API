class RolePermissionsCreateService {
  constructor(rolePermissionsRepository) {
    this.rolePermissionsRepository = rolePermissionsRepository;
  }

  async execute(role_id, insertPermissions) {
    const permissions = insertPermissions.map((permission_id) => {
      return {
        permission_id,
        role_id: Number(role_id),
      };
    });

    await this.rolePermissionsRepository.create(permissions);

    return permissions;
  }
}

module.exports = RolePermissionsCreateService;
