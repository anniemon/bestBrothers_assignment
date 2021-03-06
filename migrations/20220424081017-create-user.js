'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      identifier: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      sex: {
        type: Sequelize.STRING,
      },
      birth_date: {
        type: Sequelize.STRING,
      },
      appeal_point: {
        type: Sequelize.INTEGER,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  },
};
