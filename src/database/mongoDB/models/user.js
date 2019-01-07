const client = require('./connect').client;
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password_hashedANDsalted: String,
  isAdmin: Boolean
});

const userModel = mongoose.model('user', userSchema);

module.exports = {
  userModel
};
