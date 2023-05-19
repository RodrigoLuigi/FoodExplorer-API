const { hash, compare } = require('bcryptjs');
const AppError = require('../../utils/AppError');

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ id: user_id, name, email, password, old_password }) {
    const user = await this.userRepository.show(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    if (email) {
      const userWithUpdateEmail = await this.userRepository.findByEmail(email);

      if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
        throw new AppError('Este email já está em uso.');
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha!'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere.');
      }

      user.password = await hash(password, 8);
    }

    user.updated_at = new Date().toISOString();

    await this.userRepository.update(user);

    return user;
  }
}

module.exports = UserUpdateService;
