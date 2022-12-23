const knex = require('../database/knex');

class ProductsController {
  async create(request, response) {
    /* const imagePath = request.file?.filename; */
    const { name, description, price, category_id, ingredients } = request.body;

    const product_id = await knex('products').insert({
      name,
      description,
      price,
      category_id,
    });

    const ingredientsInsert = ingredients.map((ingredient_id) => {
      return {
        ingredient_id,
        product_id,
      };
    });

    console.log(ingredientsInsert);
    // ajustar semântica product_ingredient's'
    await knex('product_ingredient').insert(ingredientsInsert);

    return response
      .status(201)
      .json({ name, description, price, category_id, ingredientsInsert });
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();
    /* const ingredients = await knex('product_ingredient').where({product_id: id}).orderBy('id'); */

    const ingredients = await knex('product_ingredient')
      .select([
        'ingredients.id',
        'ingredients.name',
        'product_ingredient.product_id',
      ])
      .where('product_ingredient.product_id', id)
      .innerJoin(
        'ingredients',
        'ingredients.id',
        'product_ingredient.ingredient_id'
      );

    console.log(ingredients);

    return response.json({
      ...product,
      ingredients,
    });
  }

  async index(request, response) {
    const resp = await knex('products');

    return response.json(resp);
  }
}

module.exports = ProductsController;
