import  { Request, Response,NextFunction,ErrorRequestHandler } from "express";

const requestLogger = (request:Request, next:NextFunction) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (_req:Request,res:Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  console.log(error);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }
  next(error)

  return response.status(500).send({ error: 'Error interno del servidor' });
};


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}