class UserIndexService {
  constructor(userRepository, userRolesRepository) {
    this.userRepository = userRepository;
    this.userRolesRepository = userRolesRepository;
  }

  async execute() {
    const users = await this.userRepository.index();

    const roles = await this.userRolesRepository.index();

    const userWithRoles = users.map((user) => {
      const userRoles = roles.filter((role) => role.user_id === user.id);

      return {
        ...user,
        roles: userRoles,
      };
    });

    return userWithRoles;
  }
}

module.exports = UserIndexService;
