const Sequelize = require("sequelize");

module.exports = global.sequelize.define("task", {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  state: {type: Sequelize.STRING, defaultValue: 'open'}
});