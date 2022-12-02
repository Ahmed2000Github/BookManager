const Sequelize = require("sequelize");
const sequelize = require("./sequelize");
const Livre = sequelize.define(
  "livre",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    titre: { type: Sequelize.STRING(255) },
    description: { type: Sequelize.STRING(255) },
    couverture: { type: Sequelize.STRING(255) },
    genre: { type: Sequelize.STRING(255) },
    dateEdition: { type: Sequelize.DATEONLY },
    quantite: { type: Sequelize.INTEGER },
    prix: { type: Sequelize.FLOAT },
  },
  {
    tableName: "livre",
    timestamps: true,
    underscored: true,
  }
);
module.exports = Livre;
