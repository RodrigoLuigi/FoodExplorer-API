const knex = require('../database/knex');

class CategoriesRepository {
  async create({ name, icon }) {
    const category_id = await knex('categories').insert({
      name,
      icon,
    });

    return category_id;
  }

  async index() {
    const categories = await knex('categories');

    return categories;
  }

  async delete(id) {
    await knex('categories').where({ id }).delete();
  }

  async findByName(name) {
    const category = await knex('categories').where({ name }).first();

    return category;
  }
}

module.exports = CategoriesRepository;
