const DiskStorage = require('../../providers/DiskStorage');
const AppError = require('../../utils/AppError');

class IngredientImageUpdateService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async execute(id, imagePath) {
    const diskStorage = new DiskStorage();

    const ingredient = await this.ingredientsRepository.findById(id);

    if (!ingredient) {
      throw new AppError('Ingrediente não encontrado.');
    }

    if (ingredient.imagePath) {
      await diskStorage.deleteFile(ingredient.imagePath);
    }

    const fileName = await diskStorage.saveFile(imagePath);
    ingredient.imagePath = fileName;

    await this.ingredientsRepository.update({ ingredient });

    return ingredient;
  }
}

module.exports = IngredientImageUpdateService;
