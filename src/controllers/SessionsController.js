const UserRepository = require('../repositories/UserRepository');
const UserRoleRepository = require('../repositories/UserRoleRepository');
const SessionCreateService = require('../services/sessions/SessionCreateService');

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const userRoleRepository = new UserRoleRepository();

    const sessionsCreateService = new SessionCreateService(
      userRepository,
      userRoleRepository
    );

    const user = await sessionsCreateService.execute({ email, password });

    return response.json(user);
  }
}

module.exports = SessionsController;
