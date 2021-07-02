var express = require('express');
var router = express.Router();

const { bestOptionsPerYear, quoteCar } = require('../controller/segurosController');

router.post('/bestOptionsPerYear', bestOptionsPerYear);
router.post('/quoteCar', quoteCar);

module.exports = router;