'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('user_hobby', {
      fields: ['user_identifier'],
      type: 'foreign Key',
      name: 'user_identifier',
      references: { table: 'user', field: 'identifier' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('user_hobby', {
      fields: ['hobby_id'],
      type: 'foreign Key',
      name: 'hobby_id',
      references: { table: 'hobby', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_hobby', 'user_identifier');
    await queryInterface.removeConstraint('user_hobby', 'hobby_id');
  },
};
