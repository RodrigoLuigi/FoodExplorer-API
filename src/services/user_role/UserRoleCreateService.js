class UserRoleCreateService {
  constructor(userRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(user_id, insertRoles) {
    console.log(insertRoles);
    const roles = insertRoles.map((role_id) => {
      return {
        role_id,
        user_id: Number(user_id),
      };
    });

    await this.userRoleRepository.create(roles);

    return roles;
  }
}

module.exports = UserRoleCreateService;
