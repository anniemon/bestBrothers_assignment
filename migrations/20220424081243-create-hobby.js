'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hobby', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movie: {
        defaultValue: null,
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      music: {
        defaultValue: null,
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      reading: {
        defaultValue: null,
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      exercise: {
        defaultValue: null,
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      travel: {
        defaultValue: null,
        allowNull: true,
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
    await queryInterface.dropTable('hobby');
  },
};
