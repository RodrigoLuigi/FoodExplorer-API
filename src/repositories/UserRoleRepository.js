const knex = require('../database/knex');

class UserRoleRepository {
  async create(roles) {
    await knex('users_roles').insert(roles);
  }
}

module.exports = UserRoleRepository;
