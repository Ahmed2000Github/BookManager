const Sequelize = require("sequelize");
const sequelize = require("./sequelize");
const User = sequelize.define(
  "user",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: Sequelize.STRING(255) },
    email: { type: Sequelize.STRING(255) },
    password: { type: Sequelize.STRING(255) },
  },
  {
    tableName: "user",
    timestamps: true,
    underscored: true,
  }
);
module.exports = User;
