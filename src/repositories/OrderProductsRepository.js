const knex = require('../database/knex');

class OrderProductsRepository {
  async create(ingredients) {
    await knex('order_product').insert(ingredients);
  }

  async showOrderProducts(id) {
    const products = await knex('order_product')
      .select([
        'products.id',
        'products.name',
        'products.price',
        'products.imagePath',
        'order_product.order_id',
        'order_product.quantity',
      ])
      .where('order_product.order_id', id)
      .innerJoin('products', 'products.id', 'order_product.product_id');

    return products;
  }

  async index() {
    const orderProducts = await knex('order_product')
      .select([
        'products.id',
        'products.name',
        'products.price',
        'products.imagePath',
        'order_product.order_id',
        'order_product.quantity',
      ])
      .innerJoin('products', 'products.id', 'order_product.product_id');

    return orderProducts;
  }
}

module.exports = OrderProductsRepository;
