const { check } = require('express-validator');

const errForm = 'Error en los parámetros de entrada.';

module.exports = {
    createToken: [
        check('email').isString(),
        check('email').notEmpty(),
    ]
};