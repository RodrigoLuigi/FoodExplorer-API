const knex = require('../database/knex');
const CategoriesRepository = require('../repositories/CategoriesRepository');
const CategoryCreateService = require('../services/categories/CategoryCreateService');
const CategoryDeleteService = require('../services/categories/CategoryDeleteService');
const CategoryIndexService = require('../services/categories/CategoryIndexService');
/* const AppError = require('../utils/AppError'); */

class CategoriesController {
  async create(request, response) {
    const { name, icon } = request.body;

    const categoriesRepository = new CategoriesRepository();
    const categoryCreateService = new CategoryCreateService(
      categoriesRepository
    );

    const category = await categoryCreateService.execute({ name, icon });

    return response.status(201).json(category);
  }

  async index(request, response) {
    const categoriesRepository = new CategoriesRepository();
    const categoryIndexService = new CategoryIndexService(categoriesRepository);

    const categories = await categoryIndexService.execute();

    return response.status(200).json(categories);
  }

  async delete(request, response) {
    const { id } = request.params;

    const categoriesRepository = new CategoriesRepository();
    const categoryDeleteService = new CategoryDeleteService(
      categoriesRepository
    );

    await categoryDeleteService.execute(id);

    return response.status(200).json();
  }

  async indexByCategory(request, response) {
    const { categoryId } = request.params;

    const products = await knex('products').where({
      category_id: categoryId,
    });

    const productIngredients = await knex('product_ingredient')
      .select([
        'ingredients.id',
        'ingredients.name',
        'ingredients.imagePath',
        'product_ingredient.product_id',
      ])
      .innerJoin(
        'ingredients',
        'ingredients.id',
        'product_ingredient.ingredient_id'
      );

    const productWithIngredients = products.map((product) => {
      const ingredientsProduct = productIngredients.filter(
        (ingredient) => ingredient.product_id === product.id
      );

      return {
        ...product,
        ingredients: ingredientsProduct,
      };
    });

    return response.status(200).json(productWithIngredients);
  }
}

module.exports = CategoriesController;
