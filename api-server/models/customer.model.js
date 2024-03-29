const mongoose = require("mongoose");
const User = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    created: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
  })
);
module.exports = User;
