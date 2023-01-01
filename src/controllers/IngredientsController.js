const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class IngredientsController {
  async create(request, response) {
    /* const imagePath = request.query; */
    const { name } = request.body;

    if (!name) {
      throw new AppError(
        'Você deixou um campo vazio. Preencha todos os campos necessário para cadastrar um novo ingrediente!'
      );
    }

    const checkIngredientExists = await knex('ingredients').where({ name }).first();

    if (checkIngredientExists) {
      throw new AppError(
        'Este ingrediente já existe. Escolha outro nome para o ingrediente que deseja cadastrar.'
      );
    }

    try {
      await knex('ingredients').insert({
        name,
        /* imagePath */
      });

      return response.status(201).json({ name });
    } catch (error) {
      console.log(error);

      return response.sendStatus(500);
    }
  }
}

module.exports = IngredientsController;
