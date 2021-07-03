var express = require('express');
var router = express.Router();

const { bestOptionsPerYear, quoteCar } = require('../controller/segurosController');
const { checkBestOptionsPerYear, checkQuoteCar } = require('../middleware/Validators/segurosValidator')


router.post('/bestOptionsPerYear', checkBestOptionsPerYear, bestOptionsPerYear);
router.post('/quoteCar', checkQuoteCar, quoteCar);

module.exports = router;