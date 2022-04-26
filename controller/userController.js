const { user } = require('../models/user');
const { appeal } = require('../models/appeal');

module.exports = {
  getUser: async (req, res) => {
    const user_identifier = req.headers['X-user-ID'];
    const matchedUser = user.findOne({ where: { identifier: user_identifier } });

    if (matchedUser.sex == 'female') {
      const maleUsers = await user.findAll({ where: { sex: 'male' } });
      const appeals = await appeal.findAll({ where: { appealer_id: user_identifier } });

      if (appeals) {
        const receivedUserIds = appeals.map(appeal => appeal.receiver_id);
        const notAppealedMaleUsers = maleUsers.filter(maleUser => !receivedUserIds.includes(maleUser.identifier));
        const pendingAppeals = await appeals.findAll({ where: { is_responded: false } });

        if (pendingAppeals && pendingAppeals.length >= 5) {
          const filteredMaleUsers = notAppealedMaleUsers.filter(
            maleUser => !pendingAppeals.map(appeal => appeal.receiver_id).includes(maleUser.identifier)
          );
          res.status(200).json({ filteredMaleUsers });
        } else {
          res.status(200).json({ notAppealedMaleUsers });
        }
      } else {
        res.status(200).json({ maleUsers });
      }
    } else if (sex == 'male') {
      const femaleUsers = await user.findAll({ where: { sex: 'female' } });
      const appeals = await appeal.findAll({ where: { appealer_id: user_identifier } });

      if (appeals) {
        const receivedUserIds = appeals.map(appeal => appeal.receiver_id);
        const notAppealedFemaleUsers = femaleUsers.filter(
          femaleUser => !receivedUserIds.includes(femaleUser.identifier)
        );
        const pendingAppeals = await appeals.findAll({ where: { is_responded: false } });

        if (pendingAppeals && pendingAppeals.length >= 5) {
          const filteredFemaleUsers = notAppealedFemaleUsers.filter(
            femaleUser => !pendingAppeals.map(appeal => appeal.receiver_id).includes(femaleUser.identifier)
          );
          res.status(200).json({ filteredFemaleUsers });
        } else {
          res.status(200).json({ notAppealedFemaleUsers });
        }
      } else {
        res.status(200).json({ femaleUsers });
      }
    }
  },
};
