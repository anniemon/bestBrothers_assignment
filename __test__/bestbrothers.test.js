const request = require('supertest');

const app = require('../app');
const { sequelize } = require('../models');

const appealController = require('../controller/appealController');
const { appeal } = require('../models');
const userController = require('../controller/userController');
const { user } = require('../models');
const httpMocks = require('node-mocks-http');

appeal.create = jest.fn();
appeal.findOne = jest.fn();
appeal.findAll = jest.fn();
appeal.update = jest.fn();
user.decrement = jest.fn();
user.findOne = jest.fn();

const appealId = '1232342345';
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('test the root path', () => {
  it('should response the GET method', async done => {
    const resp = await request(app).get('/');
    expect(resp.statusCode).toBe(200);
    done();
  });
});

describe('Post Appeal', () => {
  beforeEach(() => {
    req.body['receiver_id'] = 'user1';
    req.headers['x-user-id'] = 'user2';
    req.body.id = appealId;
  });

  //* 어필 식별자, 어필 받는 회원 식별자, 하는 회원 식별자, 어필 일시, 응답 수락/거절, 응답 일시
  it('should have a postAppeal function', () => {
    expect(typeof appealController.postAppeal).toBe('function');
  });

  it('should return appeal_id and remaining appeal_point', async () => {
    const matchedUser = {
      identifier: 'user1',
      nickname: 'john',
      email: 'hello@gmail.com',
      sex: 'female',
      birth_date: '1990-03-12',
      appeal_point: '10',
      age: '23',
      created_at: '2021-12-01 10:50:36',
      updated_at: '2021-12-01 10:50:36',
    };
    user.findOne.mockReturnValue(matchedUser);
    const newAppeal = {
      id: appealId,
      appealer_id: 'user1',
      receiver_id: 'user2',
      appeal_date: '2021-12-01 10:50:36',
      is_responded: false,
      response_date: null,
    };
    appeal.create.mockReturnValue(newAppeal);
    await appealController.postAppeal(req, res, next);
    expect(res._getData()).toBe(
      JSON.stringify({ appeal_id: newAppeal.id, remaining_appeal_point: matchedUser.appeal_point })
    );
  });

  afterAll(async () => {
    try {
      await sequelize.close();
    } catch (err) {
      console.error('Unable to disconnect the database');
    }
  });
});
