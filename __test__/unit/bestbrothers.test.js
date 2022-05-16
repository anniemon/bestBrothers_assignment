const request = require('supertest');

const app = require('../../app');

const appealController = require('../../controller/appealController');
const { appeal } = require('../../models');
const userController = require('../../controller/userController');
const { user } = require('../../models');
const httpMocks = require('node-mocks-http');
const { matchedUser, newAppeal } = require('../data/data');

appeal.create = jest.fn();
appeal.findOne = jest.fn();
appeal.findAll = jest.fn();
appeal.update = jest.fn();
user.decrement = jest.fn();
user.findOne = jest.fn();

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
    req.body['receiver_id'] = 'user2';
    req.headers['x-user-id'] = 'user1';
    req.body.id = newAppeal.id;
  });

  it('should have a postAppeal function', () => {
    expect(typeof appealController.postAppeal).toBe('function');
  });

  it('should return appeal_id and remaining appeal_point', async () => {
    user.findOne.mockReturnValue(matchedUser);
    appeal.create.mockReturnValue(newAppeal);
    await appealController.postAppeal(req, res, next);
    expect(res._getData()).toBe(
      JSON.stringify({ appeal_id: newAppeal.id, remaining_appeal_point: matchedUser.appeal_point })
    );
  });

  it("should return 400 if requested users's appeal_point is 0", async () => {
    const userWith0AppealPoint = { ...matchedUser, appeal_point: 0 };
    user.findOne.mockReturnValue(userWith0AppealPoint);
    await appealController.postAppeal(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe('어필 포인트가 없습니다.');
  });
});
