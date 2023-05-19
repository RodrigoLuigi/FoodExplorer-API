const knex = require('../database/knex');

class UserRepository {
  async findByEmail(email) {
    const user = await knex('users').where({ email: email }).first();

    return user;
  }

  async create({ name, email, password }) {
    const user_id = await knex('users').insert({
      name,
      email,
      password,
    });

    return user_id;
  }

  async show(user_id) {
    const user = await knex('users').where({ id: user_id }).first();

    return user;
  }

  async update(user) {
    await knex('users')
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now(),
      })
      .where({ id: user.id });
  }

  async index() {
    const users = await knex('users');

    return users;
  }
}

module.exports = UserRepository;
