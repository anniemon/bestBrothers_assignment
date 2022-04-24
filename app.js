const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0.',
    info: {
      title: 'Best Brothers Assignment API',
      version: '1.0.0',
      servers: ['http://localhost:4000'],
    },
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// *                respond with users who are not the same sex as the requested user (ex. male -> female and vice versa)
// *                exclude to whom the requested user has already appealed
// *                exclude who is receiving more than 5 appeals
// *                request:
// *                maxAge(required), max: +10 min: the same as the requested user
// *                minAge(required), max: the same as the requested user, min: -10
// *                hobby(optional), allow multiple selection(OR)
// *                response:
// *                member identifier
// *                nickname
// *                sex
// *                age
// *                hobby
// Routes
/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to return matching users
 *    parameters:
 *     - name: maxAge
 *       in: query
 *       description: Age of requested user, from the same as the requested user to +10
 *       required: true
 *       schema:
 *        type: number
 *        format: number
 *     - name: minAge
 *       in: query
 *       description: Age of requested user, from -10 to the same as the requested user
 *       required: true
 *       schema:
 *        type: number
 *        format: number
 *     - name: hobby
 *       in: query
 *       description: allow multiple selection(OR)
 *       required: false
 *       schema:
 *        type: string
 *        format: string
 *    responses:
 *      '200':
 *        description: users who are not the same sex as the requested user (ex. male -> female and vice versa)
 *                - exclude to whom the requested user has already appealed
 *                - exclude who is receiving more than 5 appeals
 */
app.get('/', (req, res) => {
  res.status(200).send('hi');
});

/**
 * @swagger
 * /customers:
 *    put:
 *      description: Use to return all customers
 *    parameters:
 *      - name: customer
 *        in: query
 *        description: Name of our customer
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
app.put('/customer', (req, res) => {
  res.status(200).send('Successfully updated customer');
});

module.exports = app;
