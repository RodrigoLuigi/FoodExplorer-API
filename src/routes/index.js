const { Router } = require('express');

const usersRoutes = require('./users.routes');
const categoriesRoutes = require('./categories.routes');


const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/categories', categoriesRoutes);


module.exports = routes;
