const knex = require('../database/knex');

class ProductIngredientsRepository {
  async create(ingredients) {
    await knex('product_ingredients').insert(ingredients);
  }

  async index() {
    const ingredients = await knex('product_ingredients')
      .select([
        'ingredients.id',
        'ingredients.name',
        'ingredients.imagePath',
        'product_ingredients.product_id',
      ])
      .innerJoin(
        'ingredients',
        'ingredients.id',
        'product_ingredients.ingredient_id'
      );

    return ingredients;
  }

  async showProductIngredients(id) {
    const productIngredients = await knex('product_ingredients')
      .select([
        'ingredients.id',
        'ingredients.name',
        'ingredients.imagePath',
        'product_ingredients.product_id',
      ])
      .where('product_ingredients.product_id', id)
      .innerJoin(
        'ingredients',
        'ingredients.id',
        'product_ingredients.ingredient_id'
      );

    return productIngredients;
  }

  async deleteProductIngredients(id) {
    await knex('product_ingredients').where({ product_id: id }).delete();
  }
}

module.exports = ProductIngredientsRepository;
