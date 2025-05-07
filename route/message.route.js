const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller.js');
const auth = require('../middleware/auth.middleware.js');
const limiter = require("../middleware/rateLimit.middleware");

router.get('/', limiter(10,10), messageController.getAll);
router.get('/:id',limiter(10,10), messageController.getById);

router.post('/',auth("Member"),limiter(10,10), messageController.create);

router.put('/:id',auth("Member"),limiter(10,10), messageController.update);
router.delete('/:id',auth("Member"),limiter(10,20), messageController.remove);



module.exports = router;
