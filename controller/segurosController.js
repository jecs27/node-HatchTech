const bestOptionsPerYear = async(req, res) => {
    try {


        return res.status(200).send({ status: 200, message: 'quoteCar', data: {} });

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

module.exports = {
    bestOptionsPerYear,
    quoteCar
}