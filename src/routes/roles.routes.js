const { Router } = require('express');

const RolesController = require('../controllers/RolesController');
const rolesController = new RolesController();

const rolesRoutes = new Router();

rolesRoutes.post('/', rolesController.create);

module.exports = rolesRoutes;
