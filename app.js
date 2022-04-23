const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0.',
    info: {
      title: 'Best Brothers Assignment API',
      version: '1.0.0',
      servers: ['http://localhost:4000'],
    },
  },
  apis: ['./app.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.get('/', (req, res) => {
  res.status(200).send('hi');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
