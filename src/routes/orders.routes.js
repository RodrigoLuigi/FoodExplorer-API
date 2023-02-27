const { Router } = require('express');

const OrdersController = require('../controllers/OrdersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ordersController = new OrdersController();

const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post('/:user_id', ordersController.create);
ordersRoutes.get('/:id', ordersController.show);
ordersRoutes.get('/', ordersController.index);
ordersRoutes.patch('/:order_id', ordersController.update);

module.exports = ordersRoutes;
