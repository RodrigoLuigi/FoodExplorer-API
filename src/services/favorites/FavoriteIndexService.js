const knex = require('../../database/knex');

class FavoriteIndexService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async execute(user_id) {
    const favorites = await this.favoritesRepository.findByUserId(user_id);

    console.log(favorites);

    return favorites;
  }
}

module.exports = FavoriteIndexService;
