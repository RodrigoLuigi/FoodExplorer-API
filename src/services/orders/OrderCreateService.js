const AppError = require('../../utils/AppError');

class OrderCreateService {
  constructor(ordersRepository, productsRepository) {
    this.ordersRepository = ordersRepository;
    this.productsRepository = productsRepository;
  }

  async execute(user_id, productsSent) {
    if (!productsSent) {
      throw new AppError('O carrinho está vazio!');
    }

    const products = productsSent.map((product) => {
      return product.product_id;
    });

    const checkProductsExists = await this.productsRepository.findProducts(
      products
    );

    const productsIds = checkProductsExists.map((products) => {
      return products.id;
    });

    const checkProducts = products.every((p) => productsIds.includes(p));

    if (!checkProducts) {
      throw new AppError('Produtos incorretos!');
    }

    const orders = await this.ordersRepository.findByUserId(user_id);

    const code = String(orders.length + 1).padStart(4, '0');

    const order_id = await this.ordersRepository.create(user_id, code);

    return {
      id: Number(order_id),
      status: 'WAITING',
      code,
      description: null,
      products: checkProductsExists,
    };
  }
}

module.exports = OrderCreateService;
