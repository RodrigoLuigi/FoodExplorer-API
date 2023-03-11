const DiskStorage = require('../../providers/DiskStorage');
const AppError = require('../../utils/AppError');

class IngredientDeleteService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async execute(id) {
    const diskStorage = new DiskStorage();

    const ingredient = await this.ingredientsRepository.findById(id);

    if (!ingredient) {
      throw new AppError('Ingrediente não encontrado');
    }

    if (ingredient.imagePath) {
      await diskStorage.deleteFile(ingredient.imagePath);
    }

    await this.ingredientsRepository.delete(id);

    return ingredient;
  }
}

module.exports = IngredientDeleteService;
