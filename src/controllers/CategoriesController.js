const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class CategoriesController {
  async create(request, response) {
    const { name, icon } = request.body;

    if (!name || !icon) {
      throw new AppError(
        'Você deixou um campo vazio. Preencha todos os campos necessário para cadastrar uma nova categoria!'
      );
    }

    const checkCategoryExists = await knex('category').where({ name }).first();

    if (checkCategoryExists) {
      throw new AppError(
        'Esta categoria já existe. Escolha outro nome para a categoria que deseja cadastrar.'
      );
    }

    await knex('category').insert({
      name,
      icon,
    });

    return response.status(201).json({ name, icon });
  }

  async index(request, response) {
    const categories = await knex('category');

    return response.status(200).json(categories);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('category').where({ id }).delete();

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
