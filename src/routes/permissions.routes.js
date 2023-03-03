const { Router } = require('express');

const PermissionsController = require('../controllers/PermissionsController');
const permissionsController = new PermissionsController();

const permissionRoutes = new Router();

permissionRoutes.post('/', permissionsController.create);

module.exports = permissionRoutes;
