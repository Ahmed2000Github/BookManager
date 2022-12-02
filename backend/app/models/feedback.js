const Sequelize = require("sequelize");
const sequelize = require("./sequelize");
const Livre = require("./livre");
const FeedBack = sequelize.define(
  "feedback",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    description: { type: Sequelize.STRING(255) },
  },
  {
    tableName: "feedback",
    timestamps: true,
    underscored: true,
  }
);
Livre.hasMany(FeedBack, { onDelete: "cascade", hooks: true, as: "feedbacks" });
FeedBack.belongsTo(Livre, {
  foreignKey: "livreId",
  as: "livre",
});

module.exports = FeedBack;
