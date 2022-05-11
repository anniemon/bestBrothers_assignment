const request = require('supertest');
const app = require('../../server');
const { matchedUser, newAppeal } = require('../data/data');

it('POST /appeal', async () => {
  const response = await request(app)
    .post('/appeal')
    .send({ receiver_id: 'user2', id: newAppeal.id })
    .type('application/json')
    .set('x-user-id', 'user1');

  expect(response.statusCode).toBe(201);
  expect(response.body.appeal_id).toBe(newAppeal.id);
  expect(response.body.remaining_appeal_point).toBe(matchedUser.appeal_point);
});
