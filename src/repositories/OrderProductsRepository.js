const knex = require('../database/knex');

class OrderProductsRepository {
  async create(ingredients) {
    await knex('order_products').insert(ingredients);
  }

  async showOrderProducts(id) {
    const products = await knex('order_products')
      .select([
        'products.id',
        'products.name',
        'products.price',
        'products.imagePath',
        'order_products.order_id',
        'order_products.quantity',
      ])
      .where('order_products.order_id', id)
      .innerJoin('products', 'products.id', 'order_products.product_id');

    return products;
  }

  async index() {
    const orderProducts = await knex('order_products')
      .select([
        'products.id',
        'products.name',
        'products.price',
        'products.imagePath',
        'order_products.order_id',
        'order_products.quantity',
      ])
      .innerJoin('products', 'products.id', 'order_products.product_id');

    return orderProducts;
  }
}

module.exports = OrderProductsRepository;
