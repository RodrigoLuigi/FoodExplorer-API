const { Router } = require('express');

const ProductsController = require('../controllers/ProductsController');

const productsController = new ProductsController();

const productsRoutes = Router();

productsRoutes.post('/', productsController.create);
productsRoutes.get('/', productsController.index);
productsRoutes.get('/:id', productsController.show);
productsRoutes.delete('/:id', productsController.delete);

module.exports = productsRoutes;
