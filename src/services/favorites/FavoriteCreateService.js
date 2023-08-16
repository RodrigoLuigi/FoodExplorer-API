const AppError = require('../../utils/AppError');

class FavoriteCreateService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async execute(user_id, product_id) {
    const checkFavoriteExists = await this.favoritesRepository.findByProductId(
      user_id,
      product_id
    );

    if (checkFavoriteExists) {
      throw new AppError('Este produto já está favoritado');
    }

    const favorite_id = await this.favoritesRepository.create(
      user_id,
      product_id
    );

    return favorite_id;
  }
}

module.exports = FavoriteCreateService;
