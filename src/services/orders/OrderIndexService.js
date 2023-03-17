class OrderIndexService {
  constructor(ordersRepository, orderProductsRepository) {
    this.ordersRepository = ordersRepository;
    this.orderProductsRepository = orderProductsRepository;
  }

  async execute(user_id) {
    const orders = await this.ordersRepository.findByUserId(user_id);

    const orderProducts = await this.orderProductsRepository.index();

    const orderWithProducts = orders.map((order) => {
      const productsOrder = orderProducts.filter(
        (product) => product.order_id === order.id
      );
      return {
        ...order,
        products: productsOrder,
      };
    });

    return orderWithProducts;
  }
}

module.exports = OrderIndexService;
