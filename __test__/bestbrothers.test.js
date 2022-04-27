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

user.findOne = jest.fn();

const appealId = '1232342345';
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('test the root path', () => {
  it('should response the GET method', async () => {
    const resp = await request(app).get('/');
    expect(resp.statusCode).toBe(200);
  });
});

describe('Post Appeal', () => {
  beforeEach(() => {
    req.body['receiver_id'] = 'user2';
    req.headers['X-user-ID'] = 'user1';
  });

  //* 어필 식별자, 어필 받는 회원 식별자, 하는 회원 식별자, 어필 일시, 응답 수락/거절, 응답 일시
  it('should have a postAppeal function', () => {
    expect(typeof appealController.postAppeal).toBe('function');
  });

  it('should find user by X-user-ID', async () => {
    const matchedUser = user.findOne.mockReturnValue({
      identifier: 'user1',
      nickname: 'john',
      email: 'hello@gmail.com',
      sex: 'female',
      birth_date: '1990-03-12',
      appeal_point: '10',
      age: '23',
      created_at: '2021-12-01 10:50:36',
      updated_at: '2021-12-01 10:50:36',
    });

    matchedUser.decrement = jest.fn();
    await appealController.postAppeal(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(appeal.create).toBeCalledWith({
      id: 1,
      appealer_id: 'user1',
      receiver_id: 'user2',
      appeal_date: '2022-04-27 10:38:22',
      response_date: null,
      is_responded: false,
    });
  });

  // it('should fail when appeal_point is 0', async () => {
  //   await appealController.postAppeal(req, res, next);
  //   allUser[0];
  //   expect(user.findOne).toBeCalledWith(allUser[0]);
  // });

  // it('should return 201 response code', async () => {
  //   await appealController.postAppeal(req, res, next);
  //   expect(res.statusCode).toBe(201);
  //   expect(res._isEndCalled()).toBeTruthy();
  // });

  // it('should return json body in response', async () => {
  //   appeal.create.mockReturnValue(newAppeal);
  //   await appealController.postAppeal(req, res, next);
  //   expect(res._getJSONData()).toStrictEqual(newAppeal);
  // });

  // it('should handle errors', async () => {
  //   const errorMessage = { message: 'property missing' };
  //   // const rejectedPromise = Promise.reject(errorMessage);
  //   appeal.create.mockReturnValue(rejectedPromise);
  //   await appealController.postAppeal(req, res, next);
  //   expect(next).toHaveBeenCalledWith(errorMessage);
  // });

  afterAll(async () => {
    try {
      await sequelize.close();
    } catch (err) {
      console.error('Unable to disconnect the database');
    }
  });
});
