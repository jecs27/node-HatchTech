const { check } = require('express-validator');

const errForm = 'Error en los parámetros de entrada.';

module.exports = {
    checkBestOptionsPerYear: [
        check('year').notEmpty().withMessage('Favor de verificar el dato'),
        check('year').isNumeric().withMessage('El tipo de dato debe de ser numerico'),
    ]
};