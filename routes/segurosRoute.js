var express = require('express');
var router = express.Router();

const { bestOptionsPerYear, quoteCar } = require('../controller/segurosController');
const { checkBestOptionsPerYear } = require('../middleware/Validators/segurosValidator')


router.post('/bestOptionsPerYear', checkBestOptionsPerYear, bestOptionsPerYear);
router.post('/quoteCar', quoteCar);

module.exports = router;