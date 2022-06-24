const mongoose = require('mongoose');
const db = require("../../models");
const Role = db.role;
const User = db.user;
var bcrypt = require("bcryptjs");

const init = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.error('error: ' + err.stack);
      process.exit(1);
    });
  mongoose.connection.on('open', () => {
    console.log('connected to database');
    initial()
  });
};

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        username: 'admin',
        name: 'Admin',
        lastname: 'Admin',
        email: 'example@email.com',
        password: bcrypt.hashSync('12345678', 8)    
      }).save((err, user) => {
        if (err) {
          console.log("error", err);
        }
        Role.findOne({ name: "admin" }, (err, role) => {
          if (err) {
            console.log("Error in Init: Role", err)
          }
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              console.log("Error in Init: Save User", err)
            }
            console.log("User init: Saved successfully");
          });
        });
        console.log("added 'admin' to users collection");
      });
    }
  });
}

mongoose.Promise = global.Promise;

module.exports = init;
