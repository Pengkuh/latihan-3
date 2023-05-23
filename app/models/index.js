const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  'biodata',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.biodata = require("./bio.model.js")(sequelize, Sequelize);

module.exports = db;