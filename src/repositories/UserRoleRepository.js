const knex = require('../database/knex');

class UserRoleRepository {
  async create(roles) {
    await knex('users_roles').insert(roles);
  }

  async index() {
    const roles = await knex('users_roles')
      .select([
        'roles.id',
        'roles.name',
        'roles.description',
        'users_roles.user_id',
      ])
      .innerJoin('roles', 'roles.id', 'users_roles.role_id');

    return roles;
  }
}

module.exports = UserRoleRepository;
