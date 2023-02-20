const mongoose = require("mongoose");
const User = mongoose.model(
  "Pool",
  new mongoose.Schema({
    cust_id: mongoose.ObjectId,
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    notes: String,
    weekday: String,
    frequency: Number,
    created: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
  })
);
module.exports = User;
