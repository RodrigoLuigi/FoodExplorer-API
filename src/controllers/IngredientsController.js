const knex = require("../database/knex");

class IngredientsController {
  async create(request, response) {
    /* const imagePath = request.query; */
    const { name } = request.body;

    try {
      await knex('ingredients').insert({
        name,
        /* imagePath */
      })

    } catch (error) {
      console.log(error);

      return response.sendStatus(500);
    }

    return response.status(201).json({name});
  }
}

module.exports = IngredientsController;
