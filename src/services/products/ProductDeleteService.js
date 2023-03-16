const AppError = require('../../utils/AppError');

class ProductDeleteService {
  constructor(productsRepository, diskStorage) {
    this.productsRepository = productsRepository;
    this.diskStorage = diskStorage;
  }

  async execute(id) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError(`O produto no qual deseja deletar não existe!`);
    }

    if (product.imagePath) {
      await this.diskStorage.deleteFile(product.imagePath);
    }

    await this.productsRepository.delete(id);
  }
}

module.exports = ProductDeleteService;
