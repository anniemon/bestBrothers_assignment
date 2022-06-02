const request = require('supertest');
const app = require('../../server');
const { appeal, user } = require('../../models');
const { matchedUser, newAppeal } = require('../data/data');

it('POST /appeal', async () => {
  //* 이 요청 보내기 전에 appeal을 없애준다
  await appeal.destroy({ where: { appealer_id: 'user1', receiver_id: 'user2' } });

  const response = await request(app)
    .post('/appeal')
    .send({ receiver_id: 'user2', id: newAppeal.id })
    .type('application/json')
    .set('x-user-id', 'user1');

  await user.increment('appeal_point', { by: 1, where: { identifier: 'user1' } });

  expect(response.statusCode).toBe(201);
  expect(response.body.appeal_id).toBe(newAppeal.id);
  expect(response.body.remaining_appeal_point).toBe(matchedUser.appeal_point);
});

it('should return 401 with no user_identifier', async () => {
  const response = await request(app)
    .post('/appeal')
    .send({ receiver_id: 'user2', ...matchedUser });

  expect(response.statusCode).toBe(401);
  expect(response.text).toStrictEqual('입력 정보가 불충분합니다');
});

it('should return 401 with no receiver_id', async () => {
  const response = await request(app).post('/appeal').send(matchedUser).set('x-user-id', 'user1');

  expect(response.statusCode).toBe(401);
  expect(response.text).toStrictEqual('입력 정보가 불충분합니다');
});
