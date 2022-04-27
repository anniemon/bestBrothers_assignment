const { user } = require('../models');
const { appeal } = require('../models');
const { hobby } = require('../models');
const { user_hobby } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  searchUser: async (req, res) => {
    const user_identifier = req.headers['X-user-ID'];
    const counterpartSex = matchedUser.sex === 'male' ? 'female' : 'male';

    const maxAge = req.query.maxAge;
    const minAge = req.query.minAge;
    const reqHobby = req.query.hobby;
    //* https://example.com/hobby?hobby=movie&hobby=music&hobby=travel&hobby=reading

    if (!maxAge || !minAge) {
      return res.status(400).send({ message: '입력 정보가 불충분합니다' });
    } else {
      //TODO: 나이(o), 취미, 성별(o), 어필 이력x(o), 대기 어필 5개 미만(o)
      const counterpartSexUsers = await user.findAll({ where: { sex: counterpartSex } });
      const ageFilteredUsers = await counterpartSexUsers.findAll({ where: { [Op.between]: [minAge, maxAge] } });

      const appeals = await appeal.findAll({ where: { appealer_id: user_identifier } });
      const receiverIds = appeals.map(appeal => appeal.receiver_id);
      const notAppealedUsers = ageFilteredUsers.filter(user => !receiverIds.includes(user.identifier));
      let pendingFilteredUsers;

      for (let i = 0; i < notAppealedUsers.length; i++) {
        const pendingAppeals = await appeal.findAll({
          where: { receiver_id: notAppealedUsers[i].identifier, is_responded: false },
        });
        if (pendingAppeals && pendingAppeals.length >= 5) {
          pendingFilteredUsers = notAppealedUsers.filter(user => user.identifier !== notAppealedUsers[i].identifier);
        }
      }
      if (!reqHobby) {
        return res.status(200).json({ pendingFilteredUsers });
      } else {
        let hobbyFilteredUsers = [];
        //TODO: 취미가 있으면 취미 하나라도 맞는 유저를 찾아서 위에서 필터링한 것에서 재필터링
        //* pendingFilteredUsers 돌면서 그 아이디로 user_hobby찾고, hobby조인해서 맞으면 남기고 아니면 제거...하는 식으로 짜보기
        //* req.query.hobby => [movie, music, reading];
        const hobbies = req.query.hobby;

        res.status(200).json({ hobbyFilteredUsers });
      }
    }
  },
};
