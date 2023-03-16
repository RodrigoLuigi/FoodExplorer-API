const AppError = require('../../utils/AppError');

class ProductUpdateService {
  constructor(
    productsRepository,
    ingredientsRepository,
    productIngredientsRepository
  ) {
    this.productsRepository = productsRepository;
    this.ingredientsRepository = ingredientsRepository;
    this.productIngredientsRepository = productIngredientsRepository;
  }

  async execute(id, name, description, price, category_id, ingredients) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado.');
    }

    if (name) {
      const productWithUpdateName = await this.productsRepository.findByName(
        name
      );

      if (productWithUpdateName && productWithUpdateName.id !== product.id) {
        throw new AppError('Já existe um produto com este nome.');
      }
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category_id = category_id ?? product.category_id;

    await this.productsRepository.update(product);

    if (ingredients && ingredients.length !== 0) {
      const checkIngredientsExists =
        await this.ingredientsRepository.findIngredients(ingredients);

      const ingredientsIds = checkIngredientsExists.map((ingredients) => {
        return ingredients.id;
      });

      const checkIngredients = ingredients.every((i) =>
        ingredientsIds.includes(i)
      );

      if (!checkIngredients) {
        throw new AppError('Ingredientes incorretos!');
      }
      const ingredientsWithUpdate = ingredients.map((ingredient_id) => {
        return {
          ingredient_id,
          product_id: product.id,
        };
      });

      await this.productIngredientsRepository.deleteProductIngredients(
        product.id
      );

      await this.productIngredientsRepository.create(ingredientsWithUpdate);
    }
  }
}

module.exports = ProductUpdateService;
