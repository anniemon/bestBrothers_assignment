'use strict';
const { Model } = require('sequelize');
const { GENDERS } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      identifier: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 20],
        },
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 20],
        },
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      sex: {
        type: DataTypes.ENUM(Object.keys(GENDERS)),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      appeal_point: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      age: {
        type: DataTypes.VIRTUAL,
        get() {
          return new Date().getFullYear() - new Date(this.birthDate).getFullYear();
        },
        set() {
          throw new Error('Do not try to set the `age` value!');
        },
      },
    },
    {
      sequelize,
      modelName: 'user',
      underscored: true,
    }
  );

  return User;
};
