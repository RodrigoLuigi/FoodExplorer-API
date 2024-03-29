const AppError = require('../../utils/AppError');
const { isValidPriceFormat } = require('../../utils/PriceUtils');

class ProductCreateService {
  constructor(productsRepository, ingredientsRepository) {
    this.productsRepository = productsRepository;
    this.ingredientsRepository = ingredientsRepository;
  }

  async execute({ name, description, price, category_id, ingredients }) {
    if (!name || !description || !price || !category_id || !ingredients) {
      throw new AppError(
        'Você deixou um campo vazio. Preencha todos os campos necessários para cadastrar um novo produto!'
      );
    }

    if (!isValidPriceFormat(price)) {
      throw new AppError(
        'O campo price deve conter apenas valores numéricos no formato 10, 10,00 ou 1.000,00.'
      );
    }

    const formattedPrice = price.replace(/\./g, '').replace(',', '.');

    if (!formattedPrice.includes('.')) {
      price += ',00';
    }

    const checkProductExists = await this.productsRepository.findByName(name);

    if (checkProductExists) {
      throw new AppError(
        'Este produto já existe. Escolha outro nome para o produto que deseja cadastrar.'
      );
    }

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

    const product_id = await this.productsRepository.create({
      name,
      description,
      price,
      category_id,
    });

    const productWithIngredients = {
      id: Number(product_id),
      name,
      description,
      price,
      category_id,
      imagePath: null,
      ingredients: checkIngredientsExists,
    };

    return productWithIngredients;
  }
}

module.exports = ProductCreateService;
