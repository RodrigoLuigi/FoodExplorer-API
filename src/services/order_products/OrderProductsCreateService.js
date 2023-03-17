class OrderProductsCreateService {
  constructor(orderProductsRepository) {
    this.orderProductsRepository = orderProductsRepository;
  }

  async execute(order_id, products) {
    const productsInsert = products.map(({ product_id, quantity }) => {
      return {
        order_id,
        product_id,
        quantity,
      };
    });

    await this.orderProductsRepository.create(productsInsert);
  }
}

module.exports = OrderProductsCreateService;
