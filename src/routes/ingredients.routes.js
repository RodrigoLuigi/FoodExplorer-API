const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const IngredientsController = require('../controllers/IngredientsController');
const IngredientsImageController = require('../controllers/IngredientsImageController');

const ingredientsController = new IngredientsController();
const ingredientsImageController = new IngredientsImageController();

const ingredientsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

ingredientsRoutes.get('/', ingredientsController.index);

ingredientsRoutes.put('/:id', ingredientsController.update);

ingredientsRoutes.delete('/:id', ingredientsController.delete);

ingredientsRoutes.post('/', ingredientsController.create);

ingredientsRoutes.patch(
  '/image/:id',
  upload.single('ingredientImage'),
  ingredientsImageController.update
);

module.exports = ingredientsRoutes;
