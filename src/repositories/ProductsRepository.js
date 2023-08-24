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

  async findProducts(products) {
    const productsFound = await knex('products').whereIn('id', products);

    return productsFound;
  }

  async indexWithSearchByName(name, user_id) {
    const products = await knex('products')
      .select([
        'products.id',
        'products.name',
        'products.description',
        'products.price',
        'products.category_id',
        'products.imagePath',
        'favorites.id as is_favorite',
      ])
      .whereLike('name', `%${name}%`)
      .leftJoin('favorites', function () {
        this.on('favorites.product_id', '=', 'products.id').andOn(
          'favorites.user_id',
          '=',
          user_id
        );
      })
      .orderBy('products.id');

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
        'products.imagePath',
      ])
      .whereLike('products.name', `%${name}%`)
      .whereIn('ingredients.name', ingredients)
      .innerJoin(
        'product_ingredients',
        'product_ingredients.ingredient_id',
        'ingredients.id'
      )
      .innerJoin('products', 'products.id', 'product_ingredients.product_id')
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
