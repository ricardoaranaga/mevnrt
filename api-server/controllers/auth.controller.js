const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Redis = require("ioredis");
const redis = new Redis({ host: 'redis' });
const email = require("../helpers/email/nodemailer");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      redis.publish('app:notifications', err);
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            redis.publish('app:notifications', err);
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              redis.publish('app:notifications', err);
              return;
            }
            res.send({ message: "User was registered successfully!" });
            redis.publish('app:notifications', `User created: ${req.body.username}`);
            email.sendEmail("","ricardo.aranaga@gmail.com")
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          redis.publish('app:notifications', err);
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            redis.publish('app:notifications', err);
            return;
          }
          res.send({ message: "User registered successfully!" });
          redis.publish('app:notifications', `User created: ${req.body.username}`);
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        status: user.status,
        created: user.created,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.delete = (req, res) => {
  User.deleteOne( { "username" : req.body.username } )
  .exec((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // if (!user) {
    //     redis.publish('app:notifications', req.body.username);
    //     return res.status(404).send({ message: "User Not found." });
    //   }
      
      res.status(200).send({ message: "User deleted successfully!" });
      redis.publish('app:notifications', `User deleted: ${req.body.username}`);
    });
};