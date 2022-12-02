const User = require("../models/user");
const Role = require("../models/role");
const SequelizeConf = require("../models/sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../configurations/authConfig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
SequelizeConf.sync();
const initial = async () => {
  await Role.create({
    id: 1,
    nom: "user",
  });

  await Role.create({
    id: 2,
    nom: "admin",
  });
  console.log("Roles created .");
};
exports.signup = async (req, res) => {
  // await initial();
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            nom: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400, // 24 hours
            });
            var authorities = [];
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].nom.toUpperCase());
            }
            res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              roles: authorities,
              accessToken: token,
            });
          });
        });
      } else {
        user.setRoles([2]).then(() => {
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
          });
          res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: ["ROLE_" + "user".toUpperCase()],
            accessToken: token,
            message: "registred successfully",
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        accessToken: null,
        message: err.message,
      });
    });
};
exports.signin = async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User Not found" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "Password is incorrect.",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].nom.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        accessToken: null,
        message: err.message,
      });
    });
};
