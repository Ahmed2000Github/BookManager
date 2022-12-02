const Sequelize = require("sequelize");
const sequelize = require("./sequelize");
const Commande = require("./commande");
const Client = sequelize.define(
  "client",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: Sequelize.STRING(255) },
    prenom: { type: Sequelize.STRING(255) },
    adresse: { type: Sequelize.STRING(255) },
  },
  {
    tableName: "client",
    timestamps: true,
    underscored: true,
  }
);
Client.hasMany(Commande, { onDelete: "cascade", hooks: true, as: "commandes" });
Commande.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

module.exports = Client;
