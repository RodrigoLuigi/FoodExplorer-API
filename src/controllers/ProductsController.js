const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const DiskStorage = require('../providers/DiskStorage');

const ProductsRepository = require('../repositories/ProductsRepository');
const IngredientsRepository = require('../repositories/IngredientsRepository');
const ProductIngredientsRepository = require('../repositories/ProductIngredientsRepository');

const ProductShowService = require('../services/products/ProductShowService');
const ProductCreateService = require('../services/products/ProductCreateService');
const ProductDeleteService = require('../services/products/ProductDeleteService');
const ProductUpdateService = require('../services/products/ProductUpdateService');
const ProductIndexWithSearchService = require('../services/products/ProductIndexWithSearchService');

const ProductIngredientsCreateService = require('../services/product_ingredients/ProductIngredientsCreateService');

class ProductsController {
  async create(request, response) {
    const { name, description, price, category_id, ingredients } = request.body;

    const ingredientsRepository = new IngredientsRepository();

    const productsRepository = new ProductsRepository();
    const productCreateService = new ProductCreateService(
      productsRepository,
      ingredientsRepository
    );

    const productIngredientsRepository = new ProductIngredientsRepository();
    const productIngredientsCreateService = new ProductIngredientsCreateService(
      productIngredientsRepository
    );

    const product = await productCreateService.execute({
      name,
      description,
      price,
      category_id,
      ingredients,
    });

    await productIngredientsCreateService.execute(product.id, ingredients);

    return response.status(201).json(product);
  }

  async show(request, response) {
    const { id } = request.params;

    const productsRepostory = new ProductsRepository();
    const productIngredientsRepository = new ProductIngredientsRepository();

    const productShowService = new ProductShowService(
      productsRepostory,
      productIngredientsRepository
    );

    const product = await productShowService.execute(id);

    return response.json(product);
  }

  async index(request, response) {
    const { name, ingredients } = request.query;
    const user_id = request.user.id;

    const productsRepository = new ProductsRepository();
    const productIngredientsRepository = new ProductIngredientsRepository();

    const productIndexWithSearchService = new ProductIndexWithSearchService(
      productsRepository,
      productIngredientsRepository
    );

    const products = await productIndexWithSearchService.execute(
      name,
      user_id,
      ingredients
    );

    return response.json(products);
  }

  async delete(request, response) {
    const { id } = request.params;

    const diskStorage = new DiskStorage();
    const productsRepository = new ProductsRepository();
    const productDeleteService = new ProductDeleteService(
      productsRepository,
      diskStorage
    );

    await productDeleteService.execute(id);

    return response.status(200).json();
  }

  async update(request, response) {
    const { name, description, price, category_id, ingredients } = request.body;
    const { id } = request.params;

    const productsRepository = new ProductsRepository();
    const ingredientsRepository = new IngredientsRepository();
    const productIngredientsRepository = new ProductIngredientsRepository();

    const productUpdateService = new ProductUpdateService(
      productsRepository,
      ingredientsRepository,
      productIngredientsRepository
    );

    const product = await productUpdateService.execute(
      id,
      name,
      description,
      price,
      category_id,
      ingredients
    );

    return response.status(200).json(product);
  }
}

module.exports = ProductsController;
