const knex = require('../database/knex');

class UserRoleRepository {
  async create(role) {
    await knex('user_roles').insert(role);
  }

  async index() {
    const roles = await knex('user_roles')
      .select([
        'roles.id',
        'roles.name',
        'roles.description',
        'user_roles.user_id',
      ])
      .innerJoin('roles', 'roles.id', 'user_roles.role_id');

    return roles;
  }

  async showUserRole(user_id) {
    const role = await knex('user_roles')
      .select([
        'roles.id',
        'roles.name',
        'roles.description',
        'user_roles.user_id',
      ])
      .where('user_roles.user_id', user_id)
      .innerJoin('roles', 'roles.id', 'user_roles.role_id')
      .first();

    return role;
  }
}

module.exports = UserRoleRepository;
