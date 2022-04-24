'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('appeal', {
      fields: ['appealer_id'],
      type: 'foreign Key',
      name: 'appealer_id',
      references: { table: 'user', field: 'identifier' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('appeal', {
      fields: ['receiver_id'],
      type: 'foreign Key',
      name: 'receiver_id',
      references: { table: 'user', field: 'identifier' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('appeal', 'appealer_id');
    await queryInterface.removeConstraint('appeal', 'receiver_id');
  },
};
