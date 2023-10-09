const AppError = require('../../utils/AppError');

class OrderCreateService {
  constructor(ordersRepository, productsRepository) {
    this.ordersRepository = ordersRepository;
    this.productsRepository = productsRepository;
  }

  async execute(user_id, productsSent) {
    if (!productsSent || productsSent.length === 0) {
      throw new AppError('O carrinho está vazio!');
    }

    const productsSentIds = productsSent.map((product) => {
      return product.product_id;
    });

    const existingProducts = await this.productsRepository.findProducts(
      productsSentIds
    );

    const products = productsSent
      .map((productItem) => {
        const product = existingProducts.find(
          (product) => product.id === productItem.product_id
        );

        if (product) {
          return {
            name: product.name,
            quantity: productItem.quantity,
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);

    const description = products
      .map((product) => {
        return `${product.quantity}x ${product.name}`;
      })
      .join(', ');

    const productsIds = existingProducts.map((products) => {
      return products.id;
    });

    const checkProducts = productsSentIds.every((p) => productsIds.includes(p));

    if (!checkProducts) {
      throw new AppError('Produtos incorretos!');
    }

    const orders = await this.ordersRepository.findByUserId(user_id);

    const code = String(orders.length + 1).padStart(4, '0');

    const order_id = await this.ordersRepository.create(
      user_id,
      code,
      description
    );

    console.log(description);

    return {
      id: Number(order_id),
      status: 'WAITING',
      code,
      description,
      products: existingProducts,
    };
  }
}

module.exports = OrderCreateService;
