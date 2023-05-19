const knex = require('../database/knex');

class UserRoleRepository {
  async create(role) {
    await knex('users_roles').insert(role);
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

  async showUserRole(user_id) {
    const role = await knex('users_roles')
      .select([
        'roles.id',
        'roles.name',
        'roles.description',
        'users_roles.user_id',
      ])
      .where('users_roles.user_id', user_id)
      .innerJoin('roles', 'roles.id', 'users_roles.role_id')
      .first();

    return role;
  }
}

module.exports = UserRoleRepository;
