const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class ProductsImageController {
  async update(request, response) {
    const { id } = request.params;
    const imagePath = request.file.filename;

    const diskStorage = new DiskStorage();

    const product = await knex('products').where({ id }).first();

    if (!product) {
      throw new AppError('Produto não encontrado.');
    }

    if (product.imagePath) {
      await diskStorage.deleteFile(product.imagePath);
    }

    const fileName = await diskStorage.saveFile(imagePath);
    product.imagePath = fileName;

    await knex('products').update(product).where({ id });

    return response.json(product);
  }
}

module.exports = ProductsImageController;
