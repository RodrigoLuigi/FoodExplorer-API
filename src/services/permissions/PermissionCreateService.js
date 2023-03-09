const AppError = require('../../utils/AppError');

class PermissionCreateService {
  constructor(permissionRepository) {
    this.permissionRepository = permissionRepository;
  }

  async execute({ name, description }) {
    const checkPermissionExists = await this.permissionRepository.findByName(
      name
    );

    if (checkPermissionExists) {
      throw new AppError('Permission already exists!');
    }

    const permission_id = await this.permissionRepository.create({
      name,
      description,
    });

    return {
      id: Number(permission_id),
      name,
      description,
    };
  }
}

module.exports = PermissionCreateService;
