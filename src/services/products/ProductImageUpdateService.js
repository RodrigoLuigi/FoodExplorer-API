const AppError = require('../../utils/AppError');

class ProductImageUpdateService {
  constructor(productsRepository, diskStorage) {
    this.productsRepository = productsRepository;
    this.diskStorage = diskStorage;
  }

  async execute(id, imagePath) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado.');
    }

    if (product.imagePath) {
      await this.diskStorage.deleteFile(product.imagePath);
    }

    const fileName = await this.diskStorage.saveFile(imagePath);
    product.imagePath = fileName;

    await this.productsRepository.update(product);

    return product;
  }
}

module.exports = ProductImageUpdateService;
