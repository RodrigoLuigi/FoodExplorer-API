const knex = require('../database/knex');

class FavoritesRepository {
  async create(user_id, product_id) {
    const favorite_id = await knex('favorites').insert({ user_id, product_id });

    return favorite_id;
  }

  async findByProductId(user_id, product_id) {
    const favorite = await knex('favorites')
      .where({ user_id, product_id })
      .join('products', 'favorites.product_id', '=', 'products.id')
      .first();

    return favorite;
  }

  async findByUserId(user_id) {
    const favorites = await knex('favorites')
      .where({ user_id })
      .join('products', 'favorites.product_id', '=', 'products.id')
      .orderBy('favorites.product_id');

    return favorites;
  }
}

module.exports = FavoritesRepository;
