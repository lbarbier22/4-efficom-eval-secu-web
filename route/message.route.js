const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller.js');
const auth = require('../middleware/auth.middleware.js');

router.get('/', messageController.getAll);
router.get('/:id', messageController.getById);

router.post('/',auth("Member"), messageController.create);

router.put('/:id',auth("Member"), messageController.update);
router.delete('/:id',auth("Member"), messageController.remove);



module.exports = router;
