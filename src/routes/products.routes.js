const { Router } = require('express');
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ProductsController = require('../controllers/ProductsController');

const productsController = new ProductsController();

const productsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

/* productsRoutes.post('/', productsController.create); */
productsRoutes.post('/', upload.single("productImage"), productsController.create);
productsRoutes.get('/', productsController.index);
productsRoutes.get('/:id', productsController.show);
productsRoutes.delete('/:id', productsController.delete);

module.exports = productsRoutes;
