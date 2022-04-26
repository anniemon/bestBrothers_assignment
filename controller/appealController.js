const { appeal } = require('../models/appeal');
const { user } = require('../models/user');

module.exports = {
  postAppeal: async (req, res) => {
    const appeal_date = new Date().toISOString();
    const user_identifier = req.headers['X-user-ID'];
    const receiver_id = req.body['receiver_id'];

    const matchedUser = await user.findOne({ identifier: user_identifier });
    if (matchedUser.appeal_point === 0) {
      return res.status(400).send('어필 요청이 불가합니다.');
    } else {
      const appeals = await appeal.findAll({ where: { receiver_id } });
      const pendingAppeals = await appeals.findAll({ where: { is_responded: false } });

      if (pendingAppeals && pendingAppeals.length >= 5) {
        return res.status(400).send('어필 요청이 불가합니다.');
      }

      const isAppealed = await appeal.findOne({ where: { appealer_id: user_identifier, receiver_id: receiver_id } });
      if (isAppealed) {
        return res.status(400).send('어필 요청이 불가합니다.');
      }
      //TODO: 메일 보내기
      const newAppeal = await appeal.create({
        appealer_id: user_identifier,
        receiver_id: receiver_id,
        appeal_date: appeal_date,
        is_responded: false,
        response_date: null,
      });
      await matchedUser.decrement('appeal_point', { by: 1 });

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
