const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

const userRouter = require('./router/userRouter');
const appealRouter = require('./router/appealRouter');
// Routes
/**
 * @swagger
 * /user:
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
app.use('/user', userRouter);

/**
 * @swagger
 * /appeal:
 *    post:
 *      description: Use to create appeal request
 *    parameters:
 *      - name: X-user-ID
 *        in: headers
 *        description: identifier of requested user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: receiver_id
 *        in: req.body
 *        description: identifier of receiving user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created appeal
 */
app.use('/appeal', appealRouter);

/**
 * @swagger
 * /appeal:
 *   get:
 *      description: Use to get pending appeals
 *   parameters:
 *    responses:
 *      '200':
 *        description: list of appeals including appeal id, appealer_id, appeal_date
 */
app.use('/appeal', appealRouter);

/**
 * @swagger
 * /appeal/response:
 *    post:
 *      description: Use to respond appeals
 *    parameters:
 *      - name: appeal id
 *        in: req.body
 *        description: id of appeal
 *        required: true
 *        schema:
 *          type: number
 *          format: number
 *      - name: appeal response
 *        in: req.body
 *        description: true or false
 *        required: true
 *        schema:
 *          type: boolean
 *          format: boolean
 *    responses:
 *      '200':
 *        description: update appeal info via setting respond_date, is_responded
 *                     responses includes appeal id, is_responded, response_date
 */
app.use('/appeal', appealRouter);

app.get('/', (req, res) => {
  res.status(200).send('Welcome!');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Sorry, try later!');
});

app.use((req, res, next) => {
  res.status(404).send('not found');
});

module.exports = app;
