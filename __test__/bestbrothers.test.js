const request = require('supertest');
require('jest');

const app = require('../app');
const { sequelize } = require('../models');

describe('test the root path', () => {
  beforeAll(async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  test('It should response the GET method', async () => {
    const resp = await request(app).get('/');
    expect(resp.statusCode).toBe(404);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
