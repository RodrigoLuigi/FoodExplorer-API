const AppError = require('../../utils/AppError');

class IngredientIndexService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async execute() {
    const ingredients = await this.ingredientsRepository.index();

    if (ingredients.length <= 0) {
      throw new AppError('Não existem ingredientes cadastrados.');
    }

    return ingredients;
  }
}

module.exports = IngredientIndexService;
