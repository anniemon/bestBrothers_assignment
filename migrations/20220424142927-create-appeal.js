'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appeal', {
      id: {
        allowNull: false,
        autoIncrement: false,
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
        allowNull: true,
      },
      is_responded: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('appeal');
  },
};
