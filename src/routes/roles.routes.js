const { Router } = require('express');

const is = require('../middlewares/checkUsersPermissions');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const RolesController = require('../controllers/RolesController');

const rolesController = new RolesController();

const rolesRoutes = new Router();

rolesRoutes.post('/', rolesController.create);
rolesRoutes.get('/', rolesController.index);

module.exports = rolesRoutes;
