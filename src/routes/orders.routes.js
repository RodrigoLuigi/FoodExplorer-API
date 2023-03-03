const { Router } = require('express');

const OrdersController = require('../controllers/OrdersController');

const ordersController = new OrdersController();

const ordersRoutes = Router();

ordersRoutes.post('/:user_id', ordersController.create);

ordersRoutes.patch('/:order_id', ordersController.update);

ordersRoutes.get('/', ordersController.index);

ordersRoutes.get('/:id', ordersController.show);

module.exports = ordersRoutes;
