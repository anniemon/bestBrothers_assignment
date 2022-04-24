'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appeal', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      appealer_id: {
        type: Sequelize.STRING,
      },
      receiver_id: {
        type: Sequelize.STRING,
      },
      appeal_date: {
        type: Sequelize.DATE,
      },
      response_date: {
        type: Sequelize.DATE,
      },
      is_responded: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appeal');
  },
};
