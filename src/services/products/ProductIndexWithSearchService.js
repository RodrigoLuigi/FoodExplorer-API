class ProductIndexWithSearchService {
  constructor(productsRepository, productIngredientsRepository) {
    this.productsRepository = productsRepository;
    this.productIngredientsRepository = productIngredientsRepository;
  }

  async execute(name, ingredients) {
    let products;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map((ingredient) => ingredient.trim());

      products = await this.productsRepository.searchByIngredients(
        name,
        filterIngredients
      );
    } else {
      products = await this.productsRepository.indexWithSearchByName(name);
    }

    const productIngredients = await this.productIngredientsRepository.index();

    const productWithIngredients = products.map((product) => {
      const ingredientsProduct = productIngredients.filter(
        (ingredient) => ingredient.product_id === product.id
      );

      return {
        ...product,
        ingredients: ingredientsProduct,
      };
    });

    return productWithIngredients;
  }
}

module.exports = ProductIndexWithSearchService;
