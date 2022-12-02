const Sequelize = require("sequelize");
const sequelize = require("./sequelize");
const Commande = sequelize.define(
  "commande",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    quantite: { type: Sequelize.INTEGER },
    livreId: { type: Sequelize.INTEGER },
  },
  {
    tableName: "commande",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Commande;
