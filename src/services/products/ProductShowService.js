const AppError = require('../../utils/AppError');

class ProductShowService {
  constructor(productRepostory, productIngredientsRepository) {
    this.productRepostory = productRepostory;
    this.productIngredientsRepository = productIngredientsRepository;
  }

  async execute(id) {
    const product = await this.productRepostory.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado.');
    }

    const productIngredients =
      await this.productIngredientsRepository.showProductIngredients(id);

    return { ...product, productIngredients };
  }
}

module.exports = ProductShowService;
