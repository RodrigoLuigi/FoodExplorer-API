class ProductIngredientsCreateService {
  constructor(productIngredientsRepository) {
    this.productIngredientsRepository = productIngredientsRepository;
  }

  async execute(product_id, insertIngredients) {
    const ingredients = insertIngredients.map((ingredient_id) => {
      return {
        ingredient_id,
        product_id: Number(product_id),
      };
    });

    await this.productIngredientsRepository.create(ingredients);

    return ingredients;
  }
}

module.exports = ProductIngredientsCreateService;
