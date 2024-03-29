const db = require("../models");
const User = db.user;
const Customer = db.customer;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
    
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.allUsers = (req, res) => {
  User.find()
  .populate("roles", "-__v")
  .exec((err, users) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!users) {
      return res.status(404).send({ message: "No users found." });
    }
    res.status(200).send({
      users: users
    });
  })
};
