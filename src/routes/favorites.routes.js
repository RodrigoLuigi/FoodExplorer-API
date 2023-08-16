const { Router } = require('express');

const is = require('../middlewares/checkUsersPermissions');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const FavoritesController = require('../controllers/FavoritesController');

const favoritesController = new FavoritesController();

const favoritesRoutes = Router();

favoritesRoutes.post(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  favoritesController.create
);

favoritesRoutes.get(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  favoritesController.index
);

favoritesRoutes.delete(
  '/:product_id',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  favoritesController.delete
);

favoritesRoutes.get(
  '/:product_id',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  favoritesController.show
);

module.exports = favoritesRoutes;
