'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { user, appeal, hobby, user_hobby } = sequelize.models;
user.belongsToMany(hobby, { foreignKey: 'hobby_id', through: user_hobby });
hobby.belongsToMany(user, { foreignKey: 'user_identifier', through: user_hobby });
user.belongsToMany(user, { as: 'appealer_id', foreignKey: 'appealer_id', through: appeal });
user.belongsToMany(user, { as: 'receiver_id', foreignKey: 'receiver_id', through: appeal });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
