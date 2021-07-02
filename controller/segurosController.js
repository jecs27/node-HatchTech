const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');
const { errResponse } = require('../middleware/HandleError/HandleError');
const messageValidation = 'Error en los parametros de entrada.';

const bestOptionsPerYear = async(req, res) => {
    //validacion para archivo Validator, para que se cumpla lo necesario en el body
    let err = await errResponse(validationResult(req), res, 'error');
    if (err !== null) {
        return res.status(422).send({
            status: 422,
            message: messageValidation,
            data: err.dataErr //
        });
    }

    try {
        let { year } = req.body;

        let data = getFileJson();
        //se obtiene el filtrado en base al año
        let result = await data.filter(checkAñioSeguro(year));

        let dataRCSort = filterSortData(result, 'RC');
        let dataHighSort = filterSortData(result, 'High');
        let dataMidSort = filterSortData(result, 'Mid');
        let dataLowSort = filterSortData(result, 'Low');

        //Al tener acomodados los datos se asigna el valor 0 para elegir el de menor precio
        let response = {
            RC: dataRCSort[0],
            High: dataHighSort[0],
            Mid: dataMidSort[0],
            Low: dataLowSort[0]
        }

        return res.status(200).send({ status: 200, message: 'bestOptionsPerYear ', data: { response } });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'Ocurrió un error al consultar la mejor opción de Seguro.',
            data: { error: error.toString() }
        });
    }
}

const quoteCar = async(req, res) => {
    try {

        let brand = 'Mazda';
        let year = 2010;
        let hasAC = true;

        let data = getFileJson();
        //se obtiene el filtrado en base al año
        let result = await data.filter(checkAñioSeguro(year));


        let dataBrand = result.map((item) => {
            if (item.brand.toLowerCase() === brand.toLowerCase()) {
                return item;
            }
        });

        let dataBrandSort = dataBrand.sort((a, b) => {
            return parseFloat(a.price) - parseFloat(b.price)
        });

        return res.status(200).send({ status: 200, message: 'quoteCar', data: { dataBrandSort } });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'Ocurrió un error al cotizar coche.',
            data: { error: error.toString() }
        });
    }
}

//función para filtrado y sort de los datos por tipo "RC"-"Mid"...
const filterSortData = (array, tipo) => {
    //se realiza map para solo optener los coverageType indicados
    let data = array.map((item) => {
        if (item.coverageType === tipo) {
            return item;
        }
    });

    //posteriormente se hace un sort para acomodarlos de menor a mayor en base al campo price
    let dataSort = data.sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price)
    });

    return dataSort;
}

//validación de filtrado por el año recibido
const checkAñioSeguro = year => (data) => {
    return year >= data.yearRange[0] && year <= data.yearRange[1];
}

//Metodo para obtener los datos del archivo
const getFileJson = () => {
    let data = fs.readFileSync(path.join(__dirname, '../quotes.json'));
    let JSONdata = JSON.parse(data);
    return JSONdata;
}

module.exports = {
    bestOptionsPerYear,
    quoteCar
}