var express = require('express');
var router = express.Router();
var country = require('../service/').country;

router.get('/', country.list);
router.get('/:id', country.findById);

module.exports = router;