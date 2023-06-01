const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const is = require('../middlewares/checkUsersPermissions');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const IngredientsController = require('../controllers/IngredientsController');
const IngredientsImageController = require('../controllers/IngredientsImageController');

const ingredientsController = new IngredientsController();
const ingredientsImageController = new IngredientsImageController();

const ingredientsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

ingredientsRoutes.get(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  ingredientsController.index
);

ingredientsRoutes.put(
  '/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  ingredientsController.update
);

ingredientsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  ingredientsController.delete
);

ingredientsRoutes.post(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  ingredientsController.create
);

ingredientsRoutes.patch(
  '/image/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  upload.single('ingredientImage'),
  ingredientsImageController.update
);

module.exports = ingredientsRoutes;
