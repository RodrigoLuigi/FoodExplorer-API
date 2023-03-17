const { Router } = require('express');

const OrdersController = require('../controllers/OrdersController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ordersController = new OrdersController();

const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post('/', ordersController.create);

ordersRoutes.patch('/:order_id', ordersController.update);

ordersRoutes.get('/', ordersController.index);

ordersRoutes.get('/:id', ordersController.show);

module.exports = ordersRoutes;
