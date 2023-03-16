const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');
const ProductsRepository = require('../repositories/ProductsRepository');
const ProductImageUpdateService = require('../services/products/ProductImageUpdateService');

class ProductsImageController {
  async update(request, response) {
    const { id } = request.params;
    const imagePath = request.file.filename;

    const productsRepository = new ProductsRepository();
    const diskStorage = new DiskStorage();

    const productImageUpdateService = new ProductImageUpdateService(
      productsRepository,
      diskStorage
    );

    const product = await productImageUpdateService.execute(id, imagePath);

    return response.json(product);
  }
}

module.exports = ProductsImageController;
