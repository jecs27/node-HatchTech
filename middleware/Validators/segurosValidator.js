const { check } = require('express-validator');

const errForm = 'Error en los parámetros de entrada.';

module.exports = {
    checkBestOptionsPerYear: [
        check('year').isNumeric().withMessage('El tipo de dato debe de ser numerico'),
    ],
    checkQuoteCar: [
        check('brand').isString().withMessage('El tipo de dato debe de ser String'),
        check('year').isNumeric().withMessage('El tipo de dato debe de ser numerico'),
        check('hasAC').isBoolean().withMessage('El tipo de dato debe de ser Boolean'),
    ]

};