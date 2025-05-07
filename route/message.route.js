const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller.js');
const auth = require('../middleware/auth.middleware.js');

router.get('/', messageController.getAll);
router.get('/:id', messageController.getById);

router.post('/',auth("Admin"), messageController.create);

router.put('/:id',auth("Admin"), messageController.update);
router.delete('/:id',auth("Admin"), messageController.remove);



module.exports = router;
