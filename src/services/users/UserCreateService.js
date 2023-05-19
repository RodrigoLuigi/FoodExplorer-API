const { hash } = require('bcryptjs');
const AppError = require('../../utils/AppError');

class UserCreateService {
  constructor(userRepository, roleRepository, userRoleRepository) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.userRoleRepository = userRoleRepository;
  }

  async execute({ name, email, password, role }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Este e-mail já está em uso.');
    }

    /* if (roles.length === 0) {
      throw new AppError('As Roles não foram adicionadas.');
    } */
    const checkRoleExists = await this.roleRepository.findById(role);
    /* const checkRoleExists = await this.roleRepository.findRoles(roles); */

    /*  const rolesIds = checkRolesExists.map((role) => role.id);

    const checkRoles = roles.every((r) => rolesIds.includes(r)); */

    if (!checkRoleExists) {
      throw new AppError('Roles incorretas ou não existem!');
    }

    const hashedPassword = await hash(password, 8);

    const user_id = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: Number(user_id),
      name,
      email,
      hashedPassword,
      role: checkRoleExists,
    };
  }
}

module.exports = UserCreateService;
