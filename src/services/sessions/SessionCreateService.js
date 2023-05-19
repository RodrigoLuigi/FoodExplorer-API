const AppError = require('../../utils/AppError');
const authConfig = require('../../configs/auth');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

class SessioneCreateService {
  constructor(userRepository, userRoleRepository) {
    this.userRepository = userRepository;
    this.userRoleRepository = userRoleRepository;
  }
  async execute({ email, password }) {
    const userSignIn = await this.userRepository.findByEmail(email);

    if (!userSignIn) {
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const passwordMatched = await compare(password, userSignIn.password);

    if (!passwordMatched) {
      throw new AppError('E-mail e/ou senha incorreta', 401);
    }

    const role = await this.userRoleRepository.showUserRole(userSignIn.id);

    const user = { ...userSignIn, role: role.name };

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(userSignIn.id),
      expiresIn,
    });

    return { user, token };
  }
}

module.exports = SessioneCreateService;
