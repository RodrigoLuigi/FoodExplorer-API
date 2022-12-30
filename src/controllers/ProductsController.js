const knex = require('../database/knex');

class ProductsController {
  async create(request, response) {
    /* const imagePath = request.file?.filename; */
    const { name, description, price, category_id, ingredients } = request.body;

    const product_id = await knex('products').insert({
      name,
      description,
      price,
      category_id,
    });

    const ingredientsInsert = ingredients.map((ingredient_id) => {
      return {
        ingredient_id,
        product_id,
      };
    });

    console.log(ingredientsInsert);
    // ajustar semântica product_ingredient's'
    await knex('product_ingredient').insert(ingredientsInsert);

    return response
      .status(201)
      .json({ name, description, price, category_id, ingredientsInsert });
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await knex('products').where({ id }).first();

    const ingredients = await knex('product_ingredient')
      .select([
        'ingredients.id',
        'ingredients.name',
        'product_ingredient.product_id',
      ])
      .where('product_ingredient.product_id', id)
      .innerJoin(
        'ingredients',
        'ingredients.id',
        'product_ingredient.ingredient_id'
      );

    console.log(ingredients);

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

    console.log(productIngredients);

    return response.json(productWithIngredients);
  }

  /* async index(request, response) {
    const productsWithIngredients = await knex('products')
      .select([
        'products.id as productID',
        'products.name as product_name',
        knex.raw('GROUP_CONCAT (ingredients.name) as ingredients'),
       /*  knex.raw(
          'GROUP_CONCAT(json_object("ingredientID", ingredients.id, "ingredientName", ingredients.name)) as ingredients',
        ),
      ])
      .innerJoin(
        'product_ingredient',
        'products.id',
        'product_ingredient.product_id'
      )
      .innerJoin(
        'ingredients',
        'ingredients.id',
        'product_ingredient.ingredient_id'
      )
      .groupBy("product_name")
      .orderBy("products.id")
      .then(response => {
        /* response.forEach(product => {
          const ingredients = product.ingredients.split(",");
          product.ingredients = ingredients;
        });
        return response
      })

    return response.json(productsWithIngredients);
  }*/
}

module.exports = ProductsController;
