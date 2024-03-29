const knex = require('../database/knex');

class RoleRepository {
  async findRoles(roles) {
    const findRoles = await knex('roles').whereIn('id', roles);

    return findRoles;
  }

  async findById(id) {
    const role = await knex('roles').where({ id }).first();

    return role;
  }

  async findByName(name) {
    const role = await knex('roles').where({ name }).first();

    return role;
  }

  async create({ name, description }) {
    const role = await knex('roles').insert({ name, description });

    return role;
  }

  async index() {
    const roles = await knex('roles').orderBy('id');

    return roles;
  }
}

module.exports = RoleRepository;
