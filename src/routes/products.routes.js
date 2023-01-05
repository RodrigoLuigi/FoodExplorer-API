const { Router } = require('express');
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ProductsController = require('../controllers/ProductsController');
const ProductsImageController = require('../controllers/ProductsImageController')

const productsController = new ProductsController();
const productsImageController = new ProductsImageController();

const productsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

productsRoutes.get('/', productsController.index);
productsRoutes.get('/:id', productsController.show);
productsRoutes.put('/:id', productsController.update);
productsRoutes.delete('/:id', productsController.delete);
productsRoutes.post('/', upload.single("productImage"), productsController.create);
productsRoutes.patch('/image/:id', upload.single("productImage"), productsImageController.update);

module.exports = productsRoutes;
