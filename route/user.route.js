const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller.js');
const auth = require('../middleware/auth.middleware.js');
const limiter = require("../middleware/rateLimit.middleware");

router.get('/', limiter(10,100),userController.getAll);
router.get('/:id',limiter(10,100), userController.getById);

router.post('/', limiter(10,10),userController.create);

router.put('/:id', limiter(10,10),userController.update);
router.delete('/:id', limiter(10,100),userController.remove);

router.put('/role/:userId/:roleId', auth("Admin"), limiter(10,10),userController.addRole);
router.delete('/role/:userId/:roleId', auth("Admin"),limiter(10,10),userController.removeRole);

module.exports = router;
