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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      appealer_id: DataTypes.STRING,
      receiver_id: DataTypes.STRING,
      appeal_date: DataTypes.DATE,
      response_date: DataTypes.DATE,
      is_responded: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'appeal',
      underscored: true,
    }
  );
  return Appeal;
};
