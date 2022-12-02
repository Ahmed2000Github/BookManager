const Livre = require("../models/livre");
const FeedBack = require("../models/feedback");
const SequelizeConf = require("../models/sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
SequelizeConf.sync();
exports.getAllLivre = (req, res, next) => {
  Livre.findAll({ include: ["feedbacks"] })
    .then((livres) => {
      res.status(200).json(livres);
    })
    .catch((err) => {
      res.status(301).json({ message: err.message });
    });
};
exports.getLivre = (req, res, next) => {
  Livre.findAll({
    include: ["feedbacks"],
    where: { id: req.params.id },
  })
    .then((livre) => {
      res.status(200).json(livre);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};
exports.addLivre = (req, res, next) => {
  var path = "/uploads/defaults.jpg";
  if (req.file) {
    path = "/" + req.file.path.replace("\\", "/");
  }
  const livre = {
    titre: req.body.titre,
    description: req.body.description,
    prix: req.body.prix,
    genre: req.body.genre,
    dateEdition: req.body.dateEdition,
    couverture: path,
  };
  Livre.create(livre)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(301).json({ message: err.message });
    });
};
exports.updateLivre = (req, res, next) => {
  Livre.findAll({
    where: { id: req.params.id },
  })
    .then(function (result) {
      const livre = {
        titre: req.body.titre,
        description: req.body.description,
        id: req.params.id,
        prix: req.body.prix,
        genre: req.body.genre,
        quantite: req.body.quantite,
        dateEdition: req.body.dateEdition,
      };
      if (req.file) {
        livre.couverture = "/" + req.file.path;
        var filePath = result[0].couverture;
        if (!filePath.includes("defaults")) {
          var pathToFile = path.resolve("./") + filePath;
          fs.unlink(pathToFile, function (err) {
            if (!err) {
              console.log("Successfully deleted the file.");
            }
          });
        }
      }

      Livre.update(livre, {
        where: { id: req.params.id },
      })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(301).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(301).json({ message: err.message });
    });
};
exports.searchLivre = (req, res, next) => {
  Livre.findAll({
    include: ["feedbacks"],
    where: {
      titre: { [Op.like]: `%${req.body.titre}%` },
      genre: { [Op.like]: `%${req.body.genre}%` },
    },
  })
    .then((livre) => {
      res.status(200).json(livre);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};
exports.addFeedback = (req, res, next) => {
  console.log("##############################");
  const feedback = {
    description: req.body.description,
    livreId: req.body.livreId,
  };
  FeedBack.create(feedback)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(301).json({ message: err.message });
    });
};
exports.deleteLivre = (req, res, next) => {
  Livre.destroy({
    where: { id: req.params.id },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};
