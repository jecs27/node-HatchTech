const fs = require('fs');
const path = require('path');

const bestOptionsPerYear = async(req, res) => {
    try {
        let year = 2006;
        let data = getFileJson();
        let result = await data.filter(checkAñioSeguro(year));

        let RC = result.map((item) => {
            if (item.coverageType === 'RC') {
                return item;
            } else {}
        });

        let dataRCSort = RC.sort((a, b) => {
            return parseFloat(a.price) - parseFloat(b.price)
        });

        let High = result.map((item) => {
            if (item.coverageType === 'High') {
                return item;
            } else {}
        });

        let dataHighSort = High.sort((a, b) => {
            return parseFloat(a.price) - parseFloat(b.price)
        });

        let Mid = result.map((item) => {
            if (item.coverageType === 'Mid') {
                return item;
            } else {}
        });

        let dataMidSort = Mid.sort((a, b) => {
            return parseFloat(a.price) - parseFloat(b.price)
        });

        let Low = result.map((item) => {
            if (item.coverageType === 'Low') {
                return item;
            } else {}
        });

        let dataLowSort = Low.sort((a, b) => {
            return parseFloat(a.price) - parseFloat(b.price)
        });

        let dataResponse = {
            RC: dataRCSort[0],
            High: dataHighSort[0],
            Mid: dataMidSort[0],
            Low: dataLowSort[0],

        }

        return res.status(200).send({ status: 200, message: 'bestOptionsPerYear ', data: { dataResponse } });
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
        return res.status(200).send({ status: 200, message: 'quoteCar', data: {} });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'Ocurrió un error al cotizar coche.',
            data: { error: error.toString() }
        });
    }
}

const checkAñioSeguro = year => (data) => {
    return year >= data.yearRange[0] && year <= data.yearRange[1];
}

const getFileJson = () => {
    let data = fs.readFileSync(path.join(__dirname, '../quotes.json'));
    let JSONdata = JSON.parse(data);
    return JSONdata;
}

module.exports = {
    bestOptionsPerYear,
    quoteCar
}