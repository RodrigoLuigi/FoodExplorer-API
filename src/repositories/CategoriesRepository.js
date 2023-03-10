const knex = require('../database/knex');

class CategoriesRepository {
  async create({ name, icon }) {
    const category_id = await knex('category').insert({
      name,
      icon,
    });

    return category_id;
  }

  async index() {
    const categories = await knex('category');

    return categories;
  }

  async delete(id) {
    await knex('category').where({ id }).delete();
  }

  async findByName(name) {
    const category = await knex('category').where({ name }).first();

    return category;
  }
}

module.exports = CategoriesRepository;
