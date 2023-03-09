const knex = require('../database/knex');

class RoleRepository {
  async findRoles(roles) {
    const findRoles = await knex('roles').whereIn('id', roles);

    return findRoles;
  }

  async findByName(name) {
    const role = await knex('roles').where({ name }).first();

    return role;
  }

  async create({ name, description }) {
    const role = await knex('roles').insert({ name, description });

    return role;
  }
}

module.exports = RoleRepository;
