class RolesIndexService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute() {
    try {
      const roles = await this.roleRepository.index();

      return roles;
    } catch (error) {
      console.error('Erro ao listar as funções de usuário', error);
      throw error;
    }
  }
}

module.exports = RolesIndexService;
