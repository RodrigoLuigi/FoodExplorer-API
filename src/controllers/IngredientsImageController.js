const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class IngredientsImageController {
  async update(request, response) {
    const { id } = request.params;
    const imagePath = request.file.filename;

    const diskStorage = new DiskStorage();

    const ingredient = await knex('ingredients')
      .where({ id })
      .first();

    if (!ingredient) {
      throw new AppError('Ingrediente não encontrado.');
    }

    if (ingredient.imagePath) {
      await diskStorage.deleteFile(ingredient.imagePath);
    }

    const fileName = await diskStorage.saveFile(imagePath);
    ingredient.imagePath = fileName;

    await knex('ingredients').update(ingredient).where({ id });

    return response.json(ingredient);
  }
}

module.exports = IngredientsImageController;
