const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_hobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_hobby.init(
    {
      user_identifier: DataTypes.STRING,
      hobby_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_hobby',
    }
  );
  return user_hobby;
};
