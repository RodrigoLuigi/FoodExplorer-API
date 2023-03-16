const knex = require('../database/knex');

class ProductIngredientsRepository {
  async create(ingredients) {
    await knex('product_ingredient').insert(ingredients);
  }

  async index() {
    const ingredients = await knex('product_ingredient')
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

    return ingredients;
  }

  async showProductIngredients(id) {
    const productIngredients = await knex('product_ingredient')
      .select([
        'ingredients.id',
        'ingredients.name',
        'ingredients.imagePath',
        'product_ingredient.product_id',
      ])
      .where('product_ingredient.product_id', id)
      .innerJoin(
        'ingredients',
        'ingredients.id',
        'product_ingredient.ingredient_id'
      );

    return productIngredients;
  }

  async deleteProductIngredients(id) {
    await knex('product_ingredient').where({ product_id: id }).delete();
  }
}

module.exports = ProductIngredientsRepository;
