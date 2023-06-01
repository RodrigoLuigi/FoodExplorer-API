const { Router } = require('express');

const is = require('../middlewares/checkUsersPermissions');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const OrdersController = require('../controllers/OrdersController');

const ordersController = new OrdersController();

const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  ordersController.create
);

ordersRoutes.patch(
  '/:order_id',
  ensureAuthenticated,
  is(['ROLE_ADMIN']),
  ordersController.update
);

ordersRoutes.get(
  '/',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  ordersController.index
);

ordersRoutes.get(
  '/:id',
  ensureAuthenticated,
  is(['ROLE_ADMIN', 'ROLE_USER']),
  ordersController.show
);

module.exports = ordersRoutes;
