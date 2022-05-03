'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appeal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appeal.init(
    {
      appealerId: DataTypes.STRING,
      receiverId: DataTypes.STRING,
      appealDate: DataTypes.DATE,
      responseDate: DataTypes.DATE,
      isResponded: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'appeal',
      underscored: true,
    }
  );
  return Appeal;
};
