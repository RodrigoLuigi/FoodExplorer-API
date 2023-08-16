const AppError = require('../../utils/AppError');

class FavoriteShowService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async execute(user_id, product_id) {
    const favorite = await this.favoritesRepository.findByProductId(
      user_id,
      product_id
    );

    if (!favorite) {
      throw new AppError(`Este produto não está nos favoritos!`);
    }

    return favorite;
  }
}

module.exports = FavoriteShowService;
