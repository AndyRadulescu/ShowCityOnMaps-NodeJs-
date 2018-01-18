var express = require('express');
var router = express.Router();
var city = require('../service').city;

router.get('/', city.list);
router.get('/:id', city.findById);

module.exports = router;