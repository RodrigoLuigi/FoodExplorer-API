const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class ProductsController {
  async create(request, response) {
    const { name, description, price, category_id, ingredients } = request.body;
    const imagePath = request.file?.filename;

    const diskStorage = new DiskStorage();

    if (!name || !description || !price || !category_id || !ingredients) {
      throw new AppError(
        'Você deixou um campo vazio. Preencha todos os campos necessários para cadastrar um novo produto!'
      );
    }

    const checkProductExists = await knex('products').where({ name }).first();

    if (checkProductExists) {
      throw new AppError(
        'Este produto já existe. Escolha outro nome para o produto que deseja cadastrar.'
      );
    }

    const filename = await diskStorage.saveFile(imagePath);

    const product_id = await knex('products').insert({
      name,
      description,
      price,
      category_id,
      imagePath: filename,
    });

    const productIngredients = JSON.parse(ingredients);

    const ingredientsInsert = productIngredients.map((ingredient_id) => {
      return {
        ingredient_id,
        product_id: Number(product_id),
      };
    });

    // ajustar semântica product_ingredients'
    await knex('product_ingredient').insert(ingredientsInsert);

    return response
      .status(201)
      .json({ name, description, price, category_id, ingredientsInsert });
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();

    if (!product) {
      throw new AppError(`O produto com id ${id} não existe`);
    }

    const ingredients = await knex('product_ingredient')
      .select([
        'ingredients.id',
        'ingredients.name',
        'ingredients.imagePath',
        'product_ingredient.product_id',
      ])
      .where('product_ingredient.product_id', id)
      .innerJoin(
        'ingredients',
        'ingredients.id',
        'product_ingredient.ingredient_id'
      );

    return response.json({
      ...product,
      ingredients,
    });
  }

  async index(request, response) {
    const { name, ingredients } = request.query;

    let products;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map((ingredient) => ingredient.trim());

      products = await knex('ingredients')
        .select([
          'products.id',
          'products.name',
          'products.description',
          'products.price',
          'products.category_id',
        ])
        .whereLike('products.name', `%${name}%`)
        .whereIn('ingredients.name', filterIngredients)
        .innerJoin(
          'product_ingredient',
          'product_ingredient.ingredient_id',
          'ingredients.id'
        )
        .innerJoin('products', 'products.id', 'product_ingredient.product_id')
        .groupBy('products.name')
        .orderBy('products.name');
    } else {
      products = await knex('products')
        .whereLike('name', `%${name}%`)
        .orderBy('id');
    }

    const productIngredients = await knex('product_ingredient')
      .select([
        'ingredients.id',
        'ingredients.name',
        'ingredients.imagePath',
        'product_ingredient.product_id',
      ])
      .innerJoin(
        'ingredients',
        'ingredients.id',
        'product_ingredient.ingredient_id'
      );

    const productWithIngredients = products.map((product) => {
      const ingredientsProduct = productIngredients.filter(
        (ingredient) => ingredient.product_id === product.id
      );

      return {
        ...product,
        ingredients: ingredientsProduct,
      };
    });

    return response.json(productWithIngredients);
  }

  async delete(request, response) {
    const { id } = request.params;

    const diskStorage = new DiskStorage();

    const product = await knex('products').where({ id }).first();

    if (!product) {
      throw new AppError(`O produto com id ${id} não existe`);
    }

    if (product.imagePath) {
      await diskStorage.deleteFile(product.imagePath);
    }

    await knex('products').where({ id }).delete();

    return response.status(200).json();
  }

  async update(request, response) {
    const { name, description, price, category_id, ingredients } = request.body;
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();

    if (!product) {
      throw new AppError('Produto não encontrado.');
    }

    if (name) {
      const productWithUpdateName = await knex('products')
        .where({ name })
        .first();

      if (productWithUpdateName && productWithUpdateName.id !== product.id) {
        throw new AppError('Já existe um produto com este nome.');
      }
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category_id = category_id ?? product.category_id;

    await knex('products').update(product).where({ id: product.id });

    const ingredientsWithUpdate = ingredients.map((ingredient_id) => {
      return {
        ingredient_id,
        product_id: product.id,
      };
    });

    await knex('product_ingredient').where({ product_id: product.id }).delete();

    // ajustar semântica product_ingredients'
    await knex('product_ingredient')
      .insert(ingredientsWithUpdate)
      .where({ product_id: id });

    return response.json({ ...product, ingredientsWithUpdate });
  }
}

module.exports = ProductsController;
