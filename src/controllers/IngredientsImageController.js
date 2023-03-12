const IngredientsRepository = require('../repositories/IngredientsRepository');
const IngredientImageUpdateService = require('../services/ingredients/IngredientImageUpdateService');

class IngredientsImageController {
  async update(request, response) {
    const { id } = request.params;
    const imagePath = request.file.filename;

    const ingredientsRepository = new IngredientsRepository();
    const ingredientImageUpdateService = new IngredientImageUpdateService(
      ingredientsRepository
    );

    const updatedIngredient = await ingredientImageUpdateService.execute(
      id,
      imagePath
    );

    return response.json(updatedIngredient);
  }
}

module.exports = IngredientsImageController;
