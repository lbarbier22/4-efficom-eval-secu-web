const express = require('express');
const router = express.Router();
const roleController = require('../controller/role.controller.js');
const auth = require('../middleware/auth.middleware.js');
const limiter = require("../middleware/rateLimit.middleware");

router.get('/',limiter(10,100), roleController.getAll);
router.get('/:id',limiter(10,100), roleController.getById);

router.post('/',auth("Admin"),limiter(10,10), roleController.create);

router.put('/:id',auth("Admin"),limiter(10,10), roleController.update);
router.delete('/:id',auth("Admin"),limiter(10,20), roleController.remove);



module.exports = router;
