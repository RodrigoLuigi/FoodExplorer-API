const { Router } = require('express');

const usersRoutes = require('./users.routes');
const categoriesRoutes = require('./categories.routes');
const productsRoutes = require('./products.routes');
const ingredientsRoutes = require('./ingredients.routes');
const ordersRoutes = require('./orders.routes');
const sessionsRoutes = require('./sessions.routes');
const permissionsRoutes = require('./permissions.routes');
const rolesRoutes = require('./roles.routes');
const favoritesRoutes = require('./favorites.routes');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/products', productsRoutes);
routes.use('/ingredients', ingredientsRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/permissions', permissionsRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/favorites', favoritesRoutes);

module.exports = routes;
