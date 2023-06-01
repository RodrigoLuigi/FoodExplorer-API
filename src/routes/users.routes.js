const { Router } = require('express');

const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const is = require('../middlewares/checkUsersPermissions');

const usersController = new UsersController();

const userRoutes = Router();

userRoutes.post('/', usersController.create);

userRoutes.get(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  usersController.index
);

userRoutes.put(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  usersController.update
);

module.exports = userRoutes;
