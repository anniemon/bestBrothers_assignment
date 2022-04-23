require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME_DEV,
    port: process.env.DATABASE_PORT,
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      underscored: true,
      freezeTableName: true,
    },
    timezone: '+09:00',
    dialectOptions: {
      timezone: '+09:00',
    },
  },
  test: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      underscored: true,
      freezeTableName: true,
    },
    timezone: '+09:00',
    dialectOptions: {
      timezone: '+09:00',
    },
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD_RDS,
    database: process.env.DATABASE_NAME_RDS,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    define: {
      underscored: true,
      freezeTableName: true,
    },
    timezone: '+09:00',
    dialectOptions: {
      timezone: '+09:00',
    },
  },
};
