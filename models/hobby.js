'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hobby.init({
    movie: DataTypes.BOOLEAN,
    music: DataTypes.BOOLEAN,
    reading: DataTypes.BOOLEAN,
    exercise: DataTypes.BOOLEAN,
    travel: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'hobby',
    underscored: true,
  });
  return hobby;
};