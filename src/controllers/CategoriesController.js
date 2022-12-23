const knex = require('../database/knex');

class CategoriesController {
  async create(request, response) {
    const { name, icon } = request.body;

    try {
      await knex('category').insert({
        name,
        icon,
      });

      return response.status(201).json({ name, icon });
    } catch (error) {
      console.log(error);

      return response.status(500);
    }
  }

  async index(request, response) {
    try {
      const categories = await knex('category');

      return response.status(200).json(categories);
    } catch (error) {
      console.log(error);

      return response.sendStatus(500);
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    try {
      await knex('category').where({ id }).delete();

      return response.status(200).json();
    } catch (error) {
      console.log(error);

      return response.sendStatus(500);
    }
  }

  async indexByCategory(request, response){
    const { categoryId } = request.params;
    try {
      const products = await knex('products').where({category_id: categoryId});

      return response.json(products);
    } catch (error) {
      console.log(error);

      return response.sendStatus(500);
    }
  }
}

module.exports = CategoriesController;
