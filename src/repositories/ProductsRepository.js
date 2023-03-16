const knex = require('../database/knex');

class ProductsRepository {
  async create({ name, description, price, category_id }) {
    const product_id = await knex('products').insert({
      name,
      description,
      price,
      category_id,
    });

    return product_id;
  }

  async findByName(name) {
    const product = await knex('products').where({ name }).first();

    return product;
  }

  async findById(id) {
    const product = await knex('products').where({ id }).first();

    return product;
  }

  async indexWithSearchByName(name) {
    const products = await knex('products')
      .whereLike('name', `%${name}%`)
      .orderBy('id');

    return products;
  }

  async searchByIngredients(name, ingredients) {
    const products = await knex('ingredients')
      .select([
        'products.id',
        'products.name',
        'products.description',
        'products.price',
        'products.category_id',
      ])
      .whereLike('products.name', `%${name}%`)
      .whereIn('ingredients.name', ingredients)
      .innerJoin(
        'product_ingredient',
        'product_ingredient.ingredient_id',
        'ingredients.id'
      )
      .innerJoin('products', 'products.id', 'product_ingredient.product_id')
      .groupBy('products.name')
      .orderBy('products.name');

    return products;
  }

  async delete(id) {
    await knex('products').where({ id }).delete();
  }

  async update(product) {
    await knex('products').update(product).where({ id: product.id });
  }
}

module.exports = ProductsRepository;
