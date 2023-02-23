const { Router } = require('express');

const OrdersController = require('../controllers/OrdersController');

const ordersController = new OrdersController();

const ordersRoutes = Router();

ordersRoutes.post('/:user_id', ordersController.create);
ordersRoutes.get('/:id', ordersController.show);
ordersRoutes.get('/all/:id', ordersController.index);
ordersRoutes.patch('/:order_id', ordersController.update);

module.exports = ordersRoutes;
