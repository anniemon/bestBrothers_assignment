'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      identifier: DataTypes.STRING,
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      sex: DataTypes.STRING,
      birth_date: DataTypes.STRING,
      appeal_point: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user',
      underscored: true,
    }
  );
  return user;
};