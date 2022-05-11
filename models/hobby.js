'use strict';
const { Model } = require('sequelize');
const { HOBBIES } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Hobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hobby.init(
    {
      code: DataTypes.ENUM(Object.keys(HOBBIES)),
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'hobby',
      underscored: true,
    }
  );
  return Hobby;
};
