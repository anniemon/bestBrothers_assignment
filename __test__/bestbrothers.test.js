const request = require('supertest');
require('jest');

const app = require('../app');
const { sequelize } = require('../models');

describe('test the root path', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test('It should response the GET method', async () => {
    const resp = await request(app).get('/');
    expect(resp.statusCode).toBe(200);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
