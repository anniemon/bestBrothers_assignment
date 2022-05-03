const models = require('../models').sequelize.models;
const { user } = require('../models');
const { appeal } = require('../models');
const { hobby } = require('../models');
const { user_hobby } = require('../models');
const sequelize = require('sequelize');
const { HOBBIES, GENDER_CODES } = require('../constants');
const Op = sequelize.Op;

module.exports = {
  searchUser: async (req, res) => {
    const userIdentifier = req.headers['X-User-ID'];

    // verify X-User-ID header
    if (!userIdentifier) {
      return res.status(401).send('Unauthorized user');
    }

    // verify user
    const me = await user.findOne({ where: { identifier: userIdentifier } });

    if (!userIdentifier) {
      return res.status(400).send('User not exist');
    }

    // verify params
    const maxAge = parseInt(req?.query?.maxAge, 10);
    const minAge = parseInt(req?.query?.minAge, 10);
    const hobyParam = req?.query?.hobby;
    const hobbies = hobyParam ? Array.isArray(hobyParam) ? hobyParam : [hobyParam] : [];
    
    if (maxAge > me.age + 10 || minAge < me.age - 10) {
      return res.status(400).send('Invalid age');
    }

    const hobbyCodes = Object.keys(HOBBIES);

    if (hobbies.length > hobbyCodes.length || 
        hobbies.some(hobby => !hobbyCodes.includes(hobby))) {
      return res.status(400).send('Invalid hobby');
    }

    // build query
    const oppisitGender = {
      male: GENDER_CODES.female,
      female: GENDER_CODES.male,
    };

    const whereGender = {
      sex: oppisitGender[me.gender]
    };

    const whereAge = {
      [Op.between]: [minAge, maxAge]
    };

    const whereHobby = {
      [Op.in]: hobbies
    };

    const foundUsers = await models.user.findAll({
      attributes: {
        include: [
          'identifier',
          'nickname',
          'sex',
          'birth_date',
          [sequelize.literal(`sum( if( appeal.appealer_id = '${me.identifier}', 1, 0))`), 'appealed_by_me'],
          [sequelize.literal('sum( if( appeal.is_responded = false, 1, 0))'), 'pending_appeals'],
        ],
      },
      include: [
        {
          attributes: ['name'],
          mode: models.hobby,
          as: 'hobby',
        },
        {
          attributes: ['appealer_id', 'is_responded'],
          mode: models.appeal,
          as: 'appeal',
        },
      ],
      where: {
        ...whereGender,
        ...whereAge,
        ...whereHobby,
      },
      group: ['identifier'],
      having: {
        [Op.eq]: ['appealed_by_me', 0],
        [Op.lt]: ['pending_appeals', 5],
      },
      offset: 0,
      limit: 10,
    });
    
    res.status(200).json({
      foundUsers
    });
  },
};
