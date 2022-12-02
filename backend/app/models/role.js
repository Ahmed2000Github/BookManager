const Sequelize = require("sequelize");
const sequelize = require("./sequelize");
const User = require("./user");
const Role = sequelize.define(
  "role",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: Sequelize.STRING(255) },
  },
  {
    tableName: "role",
    timestamps: true,
    underscored: true,
  }
);
Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
module.exports = Role;
