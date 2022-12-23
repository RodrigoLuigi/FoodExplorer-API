const { Router } = require('express');

const IngredientsController = require('../controllers/IngredientsController');

const ingredientsController = new IngredientsController();

const ingredientsRoutes = Router();

ingredientsRoutes.post('/', ingredientsController.create);

module.exports = ingredientsRoutes;
