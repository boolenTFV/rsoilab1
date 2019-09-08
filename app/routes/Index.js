var controller = require('../controllers/IndexController');
var express = require('express');
var router = express.Router();

router.get('/', controller.get)
			.post('/', controller.post);

module.exports = router;