const AppError = require('../../utils/AppError');

class OrderShowService {
  constructor(ordersRepository, orderProductsRepository) {
    this.ordersRepository = ordersRepository;
    this.orderProductsRepository = orderProductsRepository;
  }

  async execute(id, user_id) {
    const order = await this.ordersRepository.findById(id, user_id);

    if (!order) {
      throw new AppError('Pedido não encontrado.');
    }

    const products = await this.orderProductsRepository.showOrderProducts(id);

    return { ...order, products };
  }
}

module.exports = OrderShowService;
