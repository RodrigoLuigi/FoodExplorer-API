const IngredientsRepository = require('../repositories/IngredientsRepository');

const IngredientIndexService = require('../services/ingredients/IngredientIndexService');
const IngredientCreateService = require('../services/ingredients/IngredientCreateService');
const IngredientDeleteService = require('../services/ingredients/IngredientDeleteService');
const IngredientUpdateService = require('../services/ingredients/IngredientUpdateService');

class IngredientsController {
  async create(request, response) {
    const { name } = request.body;

    const ingredientsRepository = new IngredientsRepository();
    const ingredientCreateService = new IngredientCreateService(
      ingredientsRepository
    );

    const ingredient = await ingredientCreateService.execute(name);

    return response.status(201).json(ingredient);
  }

  async delete(request, response) {
    const { id } = request.params;

    const ingredientsRepository = new IngredientsRepository();
    const ingredientDeleteService = new IngredientDeleteService(
      ingredientsRepository
    );

    const ingredientDeleted = await ingredientDeleteService.execute(id);

    return response.status(200).json(ingredientDeleted);
  }

  async index(request, response) {
    const ingredientsRepository = new IngredientsRepository();
    const ingredientIndexService = new IngredientIndexService(
      ingredientsRepository
    );

    const ingredients = await ingredientIndexService.execute();

    return response.status(200).json(ingredients);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const ingredientsRepository = new IngredientsRepository();
    const ingredientUpdateService = new IngredientUpdateService(
      ingredientsRepository
    );

    const ingredient = await ingredientUpdateService.execute(id, name);

    return response.json(ingredient);
  }
}

module.exports = IngredientsController;
