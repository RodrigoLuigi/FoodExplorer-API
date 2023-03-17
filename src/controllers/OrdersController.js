const OrdersRepository = require('../repositories/OrdersRepository');
const OrderProductsRepository = require('../repositories/OrderProductsRepository');

const OrderShowService = require('../services/orders/OrderShowService');
const OrderIndexService = require('../services/orders/OrderIndexService');
const OrderCreateService = require('../services/orders/OrderCreateService');
const OrderUpdateService = require('../services/orders/OrderUpdateService');
const OrderProductsCreateService = require('../services/order_products/OrderProductsCreateService');
const ProductsRepository = require('../repositories/ProductsRepository');

class OrdersController {
  async create(request, response) {
    const user_id = request.user.id;
    const { products } = request.body;

    const ordersRepository = new OrdersRepository();
    const productsRepository = new ProductsRepository();
    const orderProductsRepository = new OrderProductsRepository();

    const orderCreateService = new OrderCreateService(
      ordersRepository,
      productsRepository
    );

    const orderProductsCreateService = new OrderProductsCreateService(
      orderProductsRepository
    );

    const order_id = await orderCreateService.execute(user_id, products);

    await orderProductsCreateService.execute(order_id, products);

    return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const ordersRepository = new OrdersRepository();
    const orderProductsRepository = new OrderProductsRepository();

    const orderShowService = new OrderShowService(
      ordersRepository,
      orderProductsRepository
    );

    const order = await orderShowService.execute(id, user_id);

    return response.json(order);
  }

  async index(request, response) {
    const user_id = request.user.id;

    const ordersRepository = new OrdersRepository();
    const orderProductsRepository = new OrderProductsRepository();

    const orderIndexService = new OrderIndexService(
      ordersRepository,
      orderProductsRepository
    );

    const ordersWithProducts = await orderIndexService.execute(user_id);

    return response.json(ordersWithProducts);
  }

  async update(request, response) {
    const { order_id } = request.params;
    const { status } = request.body;

    const ordersRepository = new OrdersRepository();
    const orderUpdateService = new OrderUpdateService(ordersRepository);

    await orderUpdateService.execute(order_id, status);

    return response.status(204).json();
  }
}

module.exports = OrdersController;
