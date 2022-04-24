const { user } = require('../models/user');

module.exports = {
  getMatchedUser: async (req, res) => {
    const user_identifier = req.headers['X-user-ID'];
    const sex = req.query.sex;
    if (sex == 'female') {
      const maleUsers = await user.findAll({ where: { sex: 'male' } });
    } else if (sex == 'male') {
      const femaleUsers = await user.findAll({ where: { sex: 'female' } });
    }
    return res.status(200).send('');
  },
};
