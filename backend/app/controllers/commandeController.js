const SequelizeConf = require("../models/sequelize");
const Commande = require("../models/commande");
const Livre = require("../models/livre");
const Client = require("../models/client");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
SequelizeConf.sync();
exports.getAllcommandes = (req, res, next) => {
  Commande.findAll({ include: ["client"] })
    .then(async (result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(301).json({ message: err });
    });
};
exports.getAllClients = (req, res, next) => {
  Client.findAll()
    .then((clients) => {
      res.status(200).json(clients);
    })
    .catch((err) => {
      res.status(301).json({ message: err });
    });
};

exports.getCommande = (req, res, next) => {
  Commande.findAll({
    where: { id: req.params.id },
  })
    .then((commande) => {
      res.status(200).json(commande);
    })
    .catch((err) => {
      res.status(300).json(err);
    });
};

exports.addCommande = async (req, res, next) => {
  Livre.findAll({
    where: { id: req.body.livreId },
  })
    .then(async (result) => {
      if (result[0].quantite >= req.body.quantite) {
        Livre.update(
          {
            quantite: result[0].quantite - req.body.quantite,
          },
          {
            where: { id: req.body.livreId },
          }
        );
        var client = (
          await Client.findAll({
            where: {
              nom: req.body.nom,
              prenom: req.body.prenom,
            },
          })
        )[0];
        if (!client) {
          const data = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            adresse: req.body.adresse,
          };
          client = await Client.create(data);
        }
        const commande = {
          quantite: req.body.quantite,
          livreId: req.body.livreId,
          clientId: client.id,
        };

        Commande.create(commande)
          .then((result) => {
            res.status(200).json({ done: "commande est ajouter" });
          })
          .catch((err) => {
            res.status(301).json({ err: err });
          });
      } else {
        res.status(300).json({ message: "quantite demande n'exite pas" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(300).json(err);
    });
};

exports.deleteCommande = (req, res, next) => {
  Commande.destroy({
    where: { id: req.params.id },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};
