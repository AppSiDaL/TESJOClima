"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestLogger = (request, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};
const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, _request, response, next) => {
    console.log(error);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message });
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired',
        });
    }
    next(error);
    return response.status(500).send({ error: 'Error interno del servidor' });
};
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
