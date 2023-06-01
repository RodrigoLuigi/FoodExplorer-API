const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const is = require('../middlewares/checkUsersPermissions');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ProductsController = require('../controllers/ProductsController');
const ProductsImageController = require('../controllers/ProductsImageController');

const productsController = new ProductsController();
const productsImageController = new ProductsImageController();

const productsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

productsRoutes.get(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  productsController.index
);

productsRoutes.get(
  '/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  productsController.show
);

productsRoutes.put(
  '/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  productsController.update
);

productsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  productsController.delete
);

productsRoutes.post(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  productsController.create
);

productsRoutes.patch(
  '/image/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  upload.single('productImage'),
  productsImageController.update
);

module.exports = productsRoutes;
