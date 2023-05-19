const UserRepository = require('../repositories/UserRepository');
const RoleRepository = require('../repositories/RoleRepository');
const UserRoleRepository = require('../repositories/UserRoleRepository');

const UserIndexService = require('../services/users/UserIndexService');
const UserCreateService = require('../services/users/UserCreateService');
const UserUpdateService = require('../services/users/UserUpdateService');
const UserRoleCreateService = require('../services/user_role/UserRoleCreateService');

class UsersController {
  async create(request, response) {
    const { name, email, password, role = 2 } = request.body;

    const roleRepository = new RoleRepository();

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(
      userRepository,
      roleRepository
    );

    const userRoleRepository = new UserRoleRepository();
    const userRoleCreateService = new UserRoleCreateService(userRoleRepository);

    const user = await userCreateService.execute({
      name,
      email,
      password,
      role,
    });

    await userRoleCreateService.execute(user.id, role);

    return response.status(201).json(user);
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userUpdateService = new UserUpdateService(userRepository);

    const updatedUser = await userUpdateService.execute({
      id: user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.status(200).json(updatedUser);
  }

  async index(request, response) {
    const userRepository = new UserRepository();
    const userRoleRepository = new UserRoleRepository();

    const userIndexService = new UserIndexService(
      userRepository,
      userRoleRepository
    );

    const users = await userIndexService.execute();

    return response.status(200).json(users);
  }
}

module.exports = UsersController;
