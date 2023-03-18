const { Router } = require('express');

const is = require('../middlewares/checkUsersPermissions');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const CategoriesController = require('../controllers/CategoriesController');

const categoriesController = new CategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.get('/', categoriesController.index);

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  categoriesController.create
);

categoriesRoutes.delete(
  '/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  categoriesController.delete
);

categoriesRoutes.get(
  '/:categoryId/products',
  categoriesController.indexByCategory
);

module.exports = categoriesRoutes;
