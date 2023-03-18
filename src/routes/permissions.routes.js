const { Router } = require('express');

const is = require('../middlewares/checkUsersPermissions');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const PermissionsController = require('../controllers/PermissionsController');

const permissionsController = new PermissionsController();

const permissionRoutes = new Router();

permissionRoutes.post('/', permissionsController.create);

module.exports = permissionRoutes;
