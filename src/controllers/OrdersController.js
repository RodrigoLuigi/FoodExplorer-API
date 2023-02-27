const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class OrdersController {
  async create(request, response) {
    const { user_id } = request.params;
    const { products } = request.body;

    if (!products) {
      throw new AppError('O carrinho está vazio!');
    }

    const orders = await knex('orders').where({ user_id });

    const code = String(orders.length + 1).padStart(4, '0');

    const order_id = await knex('orders').insert({
      user_id,
      code,
    });

    const productInsert = products.map(({ product_id, quantity }) => {
      return {
        order_id,
        product_id,
        quantity,
      };
    });

    await knex('order_product').insert(productInsert);

    return response.json({
      user_id,
      code,
      products,
    });
  }

  async show(request, response) {
    const { id } = request.params;

    const order = await knex('orders').where({ id }).first();

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

    return response.json({
      ...order,
      products,
    });
  }

  async index(request, response) {
    const user_id = request.user.id;

    const orders = await knex('orders').where({ user_id });

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

    const orderWithProducts = orders.map((order) => {
      const productsOrder = orderProducts.filter(
        (product) => product.order_id === order.id
      );
      return {
        ...order,
        products: productsOrder,
      };
    });

    return response.json(orderWithProducts);
  }

  async update(request, response) {
    const { order_id } = request.params;
    const { status } = request.body;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      throw new AppError(
        'Status should be one of these. WAITING, IN_PRODUCTION, DONE'
      );
    }

    await knex('orders').where({ id: order_id }).update('status', status);

    return response.status(204).json();
  }
}

module.exports = OrdersController;
