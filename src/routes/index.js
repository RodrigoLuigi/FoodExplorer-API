const { Router } = require('express');

const usersRoutes = require('./users.routes');
const categoriesRoutes = require('./categories.routes');
const productsRoutes = require('./products.routes');
const ingredientsRoutes = require('./ingredients.routes');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/products', productsRoutes);
routes.use('/ingredients', ingredientsRoutes);

module.exports = routes;
