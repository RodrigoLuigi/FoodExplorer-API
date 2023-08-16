const knex = require('../../database/knex');
const AppError = require('../../utils/AppError');

class FavoriteDeleteService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async execute(user_id, product_id) {
    const checkFavoriteExists = await this.favoritesRepository.findByProductId(
      user_id,
      product_id
    );

    if (!checkFavoriteExists) {
      throw new AppError(`O favorito no qual deseja deletar não existe!`);
    }

    await knex('favorites').where({ user_id, product_id }).delete();
  }
}

module.exports = FavoriteDeleteService;
