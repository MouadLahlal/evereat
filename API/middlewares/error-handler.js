const { ReasonPhrases, getReasonPhrase } = require('http-status-codes');
const { ServerError, ClientError } = require('../customclass/Error');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ServerError) {
        err.statusCode = err.statusCode || 500;
        console.error("Errore SERVER : ", err.message || getReasonPhrase(err.statusCode), "\nStatus Code : ", err.statusCode);
        res.status(err.statusCode).json({message: getReasonPhrase(err.statusCode)});
    } else if (err instanceof ClientError) {
        err.statusCode = err.statusCode || 500;
        console.error("Errore CLIENT : ", err.message || getReasonPhrase(err.statusCode), "\nStatus Code : ", err.statusCode);
        res.status(err.statusCode).json({message: getReasonPhrase(err.statusCode)});
    } else {
        err.statusCode = err.statusCode || 500;
        console.error("Errore UNKNOWN : ", err.message || getReasonPhrase(err.statusCode), "\nStatus Code : ", err.statusCode);
        res.status(err.statusCode).json({message: getReasonPhrase(err.statusCode)});
    }
}

module.exports = errorHandler;