const knex = require('../database/knex');

class IngredientsRepository {
  async create(name) {
    const ingredient_id = await knex('ingredients').insert({ name });

    return ingredient_id;
  }

  async findById(id) {
    const ingredient = await knex('ingredients').where({ id }).first();

    return ingredient;
  }

  async findByName(name) {
    const ingredient = await knex('ingredients').where({ name }).first();

    return ingredient;
  }

  async findIngredients(ingredients) {
    const ingredientsFound = await knex('ingredients').whereIn(
      'id',
      ingredients
    );

    return ingredientsFound;
  }

  async delete(id) {
    await knex('ingredients').where({ id }).delete();
  }

  async index() {
    const ingredients = await knex('ingredients');

    return ingredients;
  }

  async update({ ingredient }) {
    const updatedIngredient = await knex('ingredients')
      .update(ingredient)
      .where({ id: ingredient.id });

    return updatedIngredient;
  }
}

module.exports = IngredientsRepository;
