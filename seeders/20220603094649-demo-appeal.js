'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('appeal', [
      {
        id: '27384797',
        appealer_id: 'user3',
        receiver_id: 'user1',
        appeal_date: '2021-12-01 10:50:36',
        response_date: '2021-12-01 10:50:36',
        created_at: '2021-12-01 10:50:36',
        updated_at: '2021-12-01 10:50:36',
        is_responded: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('appeal', null, {});
  },
};
