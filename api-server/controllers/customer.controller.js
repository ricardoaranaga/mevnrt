const db = require("../models");
const Customer = db.customer;
const Redis = require("ioredis");
const redis = new Redis({ host: 'redis' });
const email = require("../helpers/email/nodemailer");

exports.allCustomers = (req, res) => {
  Customer.find()
  .exec((err, customers) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!customers) {
      return res.status(404).send({ message: "No customers found." });
    }
    res.status(200).send({
      customers: customers
    });
  })
};
exports.custAdd = (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    status: req.body.status,
  });
  customer.save((err, customer) => {
    if (err) {
      res.status(500).send({ message: err });
      redis.publish('app:notifications', err);
      return;
    }
      res.send({ message: "Customer was created successfully!" });
      redis.publish('app:notifications', `customer created: ${req.body.name}`);
      if(req.body.email) {
           email.sendEmail("",req.body.email)
      }
  });
};
exports.delete = (req, res) => {
  Customer.deleteOne( { "email" : req.body.email } )
  .exec((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // if (!user) {
    //     redis.publish('app:notifications', req.body.username);
    //     return res.status(404).send({ message: "User Not found." });
    //   }
      
      res.status(200).send({ message: "Customer deleted successfully!" });
      redis.publish('app:notifications', `Customer deleted: ${req.body.email}`);
    });
};
