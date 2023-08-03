class PermissionIndexService {
  constructor(permissionRepository) {
    this.permissionRepository = permissionRepository;
  }

  async execute() {
    try {
      const permissions = await this.permissionRepository.index();

      return permissions;
    } catch (error) {
      console.error('Erro ao listar as permissões', error);
      throw error;
    }
  }
}

module.exports = PermissionIndexService;
