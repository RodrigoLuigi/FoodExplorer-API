const AppError = require('../../utils/AppError');

class OrderUpdateService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(order_id, status) {
    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      throw new AppError('O status deve ser: WAITING, IN_PRODUCTION ou DONE');
    }

    await this.ordersRepository.update(order_id, status);
  }
}

module.exports = OrderUpdateService;
