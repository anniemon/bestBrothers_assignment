const { appeal } = require('../models');
const { user } = require('../models');

module.exports = {
  postAppeal: async (req, res) => {
    const appeal_date = new Date().toISOString();
    const user_identifier = req.headers['x-user-id'];
    const receiver_id = req.body['receiver_id'];
    if (!user_identifier || !receiver_id) {
      return res.status(401).send('입력 정보가 불충분합니다');
    }

    const matchedUser = await user.findOne({ where: { identifier: user_identifier } });

    if (matchedUser.appeal_point === 0) {
      return res.status(400).send('어필 포인트가 없습니다.');
    } else {
      const pendingAppeals = await appeal.findAll({ where: { is_responded: false, receiver_id } });
      if (pendingAppeals && pendingAppeals.length >= 5) {
        return res.status(400).send('대기 중인 어필이 5개가 넘습니다.');
      }

      const isAppealed = await appeal.findOne({ where: { appealer_id: user_identifier, receiver_id: receiver_id } });
      if (isAppealed) {
        return res.status(400).send('이미 어필한 사용자입니다.');
      }

      //TODO: 메일 보내기
      const newAppeal = await appeal.create({
        id: req.body.id,
        appealer_id: user_identifier,
        receiver_id: receiver_id,
        appeal_date: appeal_date,
        is_responded: false,
        response_date: null,
      });
      await user.decrement('appeal_point', { by: 1, where: { identifier: user_identifier } });
      return res.status(201).json({ appeal_id: newAppeal.id, remaining_appeal_point: matchedUser.appeal_point });
    }
  },
  getPendingAppeals: async (req, res) => {
    const user_identifier = req.headers['X-user-ID'];
    const pendingAppeals = await appeals.findAll({
      where: { receiver_id: user_identifier, is_responded: false },
      attributes: ['id', 'appealer_id', 'appeal_date'],
    });
    return res.status(200).json({ pendingAppeals });
  },
  respondAppeal: async (req, res) => {
    //TODO: 어필 요청한 회원에게 알림 메일 발송
    const appeal_id = req.body['appeal_id'];
    const isResponded = req.body['is_responded'];
    const response_date = new Date().toISOString();

    const matchedAppeal = await appeal.findOne({ where: { appeal_id } });
    if (isResponded) {
      await matchedAppeal.update({ is_responded: true, response_date: response_date });
    }
    return res.status(200).json({ appeal_id, isResponded, response_date });
  },
};
