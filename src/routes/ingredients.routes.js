const { Router } = require('express');
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const IngredientsController = require('../controllers/IngredientsController');

const ingredientsController = new IngredientsController();

const ingredientsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

ingredientsRoutes.post('/', upload.single("ingredientImage"), ingredientsController.create);
ingredientsRoutes.delete('/:id', ingredientsController.delete);


module.exports = ingredientsRoutes;
