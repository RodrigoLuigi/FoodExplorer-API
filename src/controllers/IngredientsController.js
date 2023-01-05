const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class IngredientsController {
  async create(request, response) {
    const { name } = request.body;
    const imagePath = request.file?.filename;

    const diskStorage = new DiskStorage();

    if (!name) {
      throw new AppError(
        'Você deixou um campo vazio. Preencha todos os campos necessário para cadastrar um novo ingrediente!'
      );
    }

    const checkIngredientExists = await knex('ingredients')
      .where({ name })
      .first();

    if (checkIngredientExists) {
      throw new AppError(
        'Este ingrediente já existe. Escolha outro nome para o ingrediente que deseja cadastrar.'
      );
    }

    const filename = await diskStorage.saveFile(imagePath);

    await knex('ingredients').insert({
      name,
      imagePath: filename,
    });

    return response.status(201).json({ name, imagePath });
  }

  async delete(request, response) {
    const { id } = request.params;

    const diskStorage = new DiskStorage();

    const ingredient = await knex('ingredients').where({ id }).first();

    if (!ingredient) {
      throw new AppError(`O ingrediente com id ${id} não existe`);
    }

    if (ingredient.imagePath) {
      await diskStorage.deleteFile(ingredient.imagePath);
    }

    await knex('ingredients').where({ id }).delete();

    return response.status(200).json();
  }

  async index(request, response) {
    const ingredients = await knex('ingredients');

    return response.status(200).json(ingredients);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const ingredient = await knex('ingredients').where({ id }).first();

    if (!ingredient) {
      throw new AppError('Ingrediente não encontrado.');
    }

    const ingredientName = await knex('ingredients').where({ name }).first();

    if (ingredientName && ingredientName.id !== ingredient.id) {
      throw new AppError('Já existe um ingrediente com este nome.');
    }

    if (!name.trim()) {
      throw new AppError(
        'Você deixou o campo NOME vazio. Digite um novo NOME para o ingrediente.'
      );
    }

    ingredient.name = name ?? ingredient.name;

    await knex('ingredients').update(ingredient).where({ id });

    return response.json(ingredient);
  }
}

module.exports = IngredientsController;
