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

async function initial() {
  try {
    const roleCount = await Role.estimatedDocumentCount();
    if (roleCount === 0) {
      await Role.create([
        { name: "user" },
        { name: "moderator" },
        { name: "admin" }
      ]);
      console.log("Added 'user', 'moderator', 'admin' to roles collection");
    }

    const userCount = await User.estimatedDocumentCount();
    if (userCount === 0) {
      const adminRole = await Role.findOne({ name: "admin" });
      const admin = new User({
        username: 'admin',
        name: 'Admin',
        lastname: 'Admin',
        email: 'example@email.com',
        password: bcrypt.hashSync('12345678', 8)
      });
      admin.roles = [adminRole._id];
      await admin.save();
      console.log("Added 'admin' to users collection");
    }
  } catch (err) {
    console.error("Initial setup failed:", err);
  }
}

mongoose.Promise = global.Promise;

module.exports = init;
