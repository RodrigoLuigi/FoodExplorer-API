const AppError = require('../../utils/AppError');

class IngredientCreateService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async execute(name) {
    if (!name) {
      throw new AppError(
        'Você deixou um campo vazio. Preencha todos os campos necessários para cadastrar um novo ingrediente!'
      );
    }

    const checkIngredientExists = await this.ingredientsRepository.findByName(
      name
    );

    if (checkIngredientExists) {
      throw new AppError('Já existe um ingrediente com este nome.');
    }

    const ingredient_id = await this.ingredientsRepository.create(name);

    return {
      id: Number(ingredient_id),
      name,
      imagePath: null,
    };
  }
}

module.exports = IngredientCreateService;
