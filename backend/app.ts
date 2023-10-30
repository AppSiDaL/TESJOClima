const express = require('express');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');
const weatherRouter = require("./controllers/weather")

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use('/api', weatherRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
