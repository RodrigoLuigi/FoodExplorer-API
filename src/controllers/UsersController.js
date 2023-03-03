const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');

class UsersController {
  async create(request, response) {
    const { name, email, password, roles = [1] } = request.body;

    const checkUserExists = await knex('users').where({ email }).first();

    if (checkUserExists) {
      throw new AppError('Este e-mail já está em uso.');
    }

    if (roles.length === 0) {
      throw new AppError('As Roles não foram adicionadas.');
    }

    const existsRoles = await knex('roles').whereIn('id', roles);

    const rolesIds = existsRoles.map((role) => role.id);

    const checkRolesExists = roles.every((r) => rolesIds.includes(r));

    if (!checkRolesExists) {
      throw new AppError('Roles incorretas.');
    }

    const hashedPassword = await hash(password, 8);

    const user_id = await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    });

    if (!roles) {
      await knex('users_roles').insert({ user_id });
    } else {
      const insertRoles = rolesIds.map((role_id) => {
        return {
          role_id,
          user_id: Number(user_id),
        };
      });

      await knex('users_roles').insert(insertRoles);
    }

    return response
      .status(201)
      .json({ name, email, hashedPassword, existsRoles });
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [
      user_id,
    ]);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userWithUpdateEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError('Este email já está em uso.');
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

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json();
  }
}

module.exports = UsersController;
