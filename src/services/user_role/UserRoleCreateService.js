class UserRoleCreateService {
  constructor(userRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(user_id, role_id) {
    /*   console.log(insertRoles);
    const roles = insertRoles.map((role_id) => {
      return {
        role_id,
        user_id: Number(user_id),
      };
    }); */
    const role = { role_id, user_id };

    await this.userRoleRepository.create(role);

    return role;
  }
}

module.exports = UserRoleCreateService;
