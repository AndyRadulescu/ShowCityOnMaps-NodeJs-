var express = require('express');
var router = express.Router();
var continent = require('../service/').continent;

router.get('/', continent.list);
router.get('/:id', continent.findById);

module.exports = router;