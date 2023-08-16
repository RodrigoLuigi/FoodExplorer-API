const FavoritesRepository = require('../repositories/FavoritesRepository');

const FavoriteCreateService = require('../services/favorites/FavoriteCreateService');
const FavoriteIndexService = require('../services/favorites/FavoriteIndexService');
const FavoriteDeleteService = require('../services/favorites/FavoriteDeleteService');
const FavoriteShowService = require('../services/favorites/FavoriteShowService');

class FavoritesController {
  async create(request, response) {
    const { product_id } = request.body;
    const user_id = request.user.id;

    const favoritesRepository = new FavoritesRepository();

    const favoriteCreateService = new FavoriteCreateService(
      favoritesRepository
    );

    await favoriteCreateService.execute(user_id, product_id);

    return response.status(201).json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const favoritesRepository = new FavoritesRepository();

    const favoriteIndexService = new FavoriteIndexService(favoritesRepository);

    const favorites = await favoriteIndexService.execute(user_id);

    return response.status(200).json(favorites);
  }

  async delete(request, response) {
    const { product_id } = request.params;
    const user_id = request.user.id;

    const favoritesRepository = new FavoritesRepository();

    const favoriteDeleteService = new FavoriteDeleteService(
      favoritesRepository
    );

    await favoriteDeleteService.execute(user_id, product_id);

    return response.status(200).json();
  }

  async show(request, response) {
    const { product_id } = request.params;
    const user_id = request.user.id;

    const favoritesRepository = new FavoritesRepository();

    const favoriteShowService = new FavoriteShowService(favoritesRepository);

    const favorite = await favoriteShowService.execute(user_id, product_id);

    return response.status(200).json(favorite);
  }
}

module.exports = FavoritesController;
