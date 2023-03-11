class IngredientUpdateService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async execute(id, name) {
    const ingredient = await this.ingredientsRepository.findById(id);

    if (!ingredient) {
      throw new AppError('Ingrediente não encontrado.');
    }

    const ingredientName = await this.ingredientsRepository.findByName(name);

    if (ingredientName && ingredientName.id !== ingredient.id) {
      throw new AppError('Já existe um ingrediente com este nome.');
    }

    if (!name.trim()) {
      throw new AppError(
        'Você deixou o campo NOME vazio. Digite um novo NOME para o ingrediente.'
      );
    }

    ingredient.name = name ?? ingredient.name;

    await this.ingredientsRepository.update({ ingredient });

    return ingredient;
  }
}

module.exports = IngredientUpdateService;
