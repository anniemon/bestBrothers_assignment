'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: '1',
          identifier: 'user1',
          nickname: 'john',
          email: 'hello@gmail.com',
          sex: 'female',
          birth_date: '1990-03-12',
          appeal_point: '10',
          age: '23',
          created_at: '2021-12-01 10:50:36',
          updated_at: '2021-12-01 10:50:36',
        },
        {
          id: '2',
          identifier: 'user2',
          nickname: 'sam',
          email: 'sorry@gmail.com',
          sex: 'female',
          birth_date: '1995-05-23',
          appeal_point: '4',
          age: '28',
          created_at: '2021-12-01 10:50:36',
          updated_at: '2021-12-01 10:50:36',
        },
        {
          id: '3',
          identifier: 'user3',
          nickname: 'john',
          email: 'hi@gmail.com',
          sex: 'male',
          birth_date: '1990-03-12',
          appeal_point: '0',
          age: '26',
          created_at: '2021-12-01 10:50:36',
          updated_at: '2021-12-01 10:50:36',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
